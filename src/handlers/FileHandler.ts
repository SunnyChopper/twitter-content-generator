// Services
import FileService from "/opt/services/FileService";

// Contracts


// AWS Lambda
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const getFilesHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { }

export const uploadFileHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { }

export const deleteFileHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { }