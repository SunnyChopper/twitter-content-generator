// Services
import InsightsService from "/opt/services/InsightsService";

// Contracts


// AWS Lambda
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const getInsightsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { }

export const getInsightsForFileHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { }

export const getDashboardInsightsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { }
