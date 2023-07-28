// Services
import FileService from "/opt/services/FileService";

// Entities
import { TwitterFile } from "src/entity/TwitterFile";

// Utils
import { getCurrentUserId } from 'src/utils/cognitoUsers';
import { buildResponse } from 'src/utils/responses';

// AWS Lambda
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const createFileHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.body === null || event.body === undefined) {
        return buildResponse(event, 400, { error: "Invalid request body. Cannot upload file." });
    }

    const fileService = new FileService();
    try {
        let uploadedFileId: number = await fileService.saveFile(JSON.parse(event.body) as TwitterFile);
        return buildResponse(event, 200, { id: uploadedFileId });
    } catch (error) {
        console.error(error);
        return buildResponse(event, 500, { error: `Failed to upload file. Error: ${error}` });
    }
}

export const getFilesHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getCurrentUserId(event);
    if (userId === undefined) {
        return buildResponse(event, 400, { error: "Invalid request body. Cannot retrieve an authorized user." });
    }

    let fileService = new FileService();
    try {
        let files: TwitterFile[] = await fileService.getFiles(userId);
        return buildResponse(event, 200, files);
    } catch (error) {
        console.error(error);
        return buildResponse(event, 500, { error: `Failed to retrieve files. Error: ${error}` });
    }
}

export const deleteFileHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.body === null || event.body === undefined) {
        return buildResponse(event, 400, { error: "Invalid request body. Cannot delete file." });
    }

    let userId = getCurrentUserId(event);
    if (userId === undefined) {
        return buildResponse(event, 400, { error: "Invalid request body. Cannot retrieve an authorized user." });
    }

    let fileId: string | undefined = JSON.parse(event.body).fileId;
    if (fileId === null || fileId === undefined) {
        return buildResponse(event, 400, { error: "Invalid request body. Cannot delete file." });
    }

    let fileService = new FileService();
    try {
        await fileService.deleteFile(fileId, userId);
        return buildResponse(event, 200, { message: "File deleted successfully." });
    } catch (error) {
        console.error(error);
        return buildResponse(event, 500, { error: `Failed to delete file. Error: ${error}` });
    }
}