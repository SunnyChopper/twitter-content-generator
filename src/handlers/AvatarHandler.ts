// Services
import AvatarService from "/opt/services/AvatarService";

// Contracts
import { GenerateAvatarInput, GenerateAvatarOutput } from "src/contracts/avatars/GenerateAvatar";
import { UpdateAvatarInput, UpdateAvatarOutput } from "src/contracts/avatars/UpdateAvatar";

// AWS Lambda
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// Utils
import { getCurrentUserId } from "src/utils/cognitoUsers";
import { buildResponse } from 'src/utils/responses';

// Path: /api/avatars; Method: GET
export const getAvatarsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Add app logic here to retrieve the avatars from the database
    const userId: string | undefined = getCurrentUserId(event);
    if (userId === undefined) {
        return buildResponse(event, 400, { error: "Invalid request body. Cannot determine current user." });
    }

    let avatarService: AvatarService = new AvatarService();
    const avatars = await avatarService.getAvatars(userId);
    if (avatars === null) {
        return buildResponse(event, 500, { error: "Failed to retrieve avatars." });
    }

    return buildResponse(event, 200, avatars);
}

// Path: /api/avatars; Method: POST
export const createAvatarHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.body === null || event.body === undefined) {
        return buildResponse(event, 400, { error: "Invalid request body." });
    }

    let currentUserId: string | undefined = getCurrentUserId(event);
    if (currentUserId === undefined) {
        return buildResponse(event, 400, { error: "Invalid request body. Cannot determine current user." });
    }

    let incompleteRequest = JSON.parse(event.body) as { fileKey: string };

    let request: GenerateAvatarInput;
    try {
        request = {
            fileKey: incompleteRequest.fileKey,
            userId: currentUserId
        }
    } catch (error) {
        return buildResponse(event, 400, { error: `Invalid request body. Error: ${error}` });
    }

    let avatarService: AvatarService = new AvatarService();
    let avatar: GenerateAvatarOutput | null;
    try {
        avatar = await avatarService.generateAvatar(request);
    } catch (error) {
        console.log(error);
        return buildResponse(event, 500, { error: `Failed to create avatar. Error: ${error}` });
    }

    if (avatar === null) {
        return buildResponse(event, 500, { error: "Failed to create avatar. Error: avatar is null." });
    }

    try {
        await avatarService.saveAvatar(currentUserId, incompleteRequest.fileKey, avatar);
    } catch (error) {
        console.log(error);
        return buildResponse(event, 500, { error: `Failed to save avatar. Error: ${error}` });
    }

    return buildResponse(event, 200, avatar);
}

export const updateAvatarHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
    if (event.body === null || event.body === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body." })
        }
    }

    let request: UpdateAvatarInput;
    try {
        request = JSON.parse(event.body) as UpdateAvatarInput;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: `Invalid request body. Error: ${error}` })
        }
    }

    let avatarService: AvatarService = new AvatarService();
    let avatar: UpdateAvatarOutput;
    try {
        avatar = await avatarService.updateAvatar(request) as UpdateAvatarOutput;
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to update avatar. Error: ${error}` })
        }
    }

    // TODO: Add app logic here to put everything together into an avatar object and update it in the database

    return {
        statusCode: 200,
        body: JSON.stringify(avatar)
    }
}

export const deleteAvatarHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Please implement deleteAvatarHandler" })
    }
}
