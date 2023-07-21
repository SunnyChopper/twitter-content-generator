// Services
import FeedbackService from "/opt/services/FeedbackService";

// Contracts


// AWS Lambda
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const getFeedbackHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { }

export const submitFeedbackHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { }

export const updateFeedbackHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { }

export const deleteFeedbackHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { }
