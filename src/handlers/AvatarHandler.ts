// Services
import AvatarService from "/opt/services/AvatarService";

// Contracts


// AWS Lambda
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const getAvatarsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { }

export const createAvatarHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { }

export const updateAvatarHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { }

export const deleteAvatarHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { }
