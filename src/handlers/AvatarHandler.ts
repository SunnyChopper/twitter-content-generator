// Services
import AvatarService from "/opt/services/AvatarService";

// Contracts
import { CreateAvatarInput, CreateAvatarOutput } from "/contracts/avatars/CreateAvatar";
import { UpdateAvatarInput, UpdateAvatarOutput } from "/contracts/avatars/UpdateAvatar";

// AWS Lambda
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const getAvatarsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Add app logic here to retrieve the avatars from the database
}

export const createAvatarHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.body === null || event.body === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body." })
        }
    }

    let request: CreateAvatarInput;
    try {
        request = JSON.parse(event.body) as CreateAvatarInput;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: `Invalid request body. Error: ${error}` })
        }
    }

    let avatarService: AvatarService = new AvatarService();
    let avatar: CreateAvatarOutput;
    try {
        avatar = await avatarService.createAvatar(request) as CreateAvatarOutput;
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to create avatar. Error: ${error}` })
        }
    }

    // TODO: Add app logic here to put everything together into an avatar object and save it to the database

    return {
        statusCode: 200,
        body: JSON.stringify(avatar)
    }
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
        avatar = await avatarService.createAvatar(request) as UpdateAvatarOutput;
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
    // TODO: Add app logic here to delete the avatar from the database
}
