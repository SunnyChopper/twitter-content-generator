// Services
import InsightsService from "/opt/services/InsightsService";

// Contracts
import { GetDashboardInsightsInput, GetDashboardInsightsOutput } from "/contracts/insights/GetDashboardInsights";
import { GetInsightsForFileInput, GetInsightsForFileOutput } from "/contracts/insights/GetInsightsForFile";

// AWS Lambda
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const getInsightsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
    if (event.body === null || event.body === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body." })
        }
    }

    let request: GetInsightsForFileInput;
    try {
        request = JSON.parse(event.body) as GetInsightsForFileInput;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: `Invalid request body. Error: ${error}` })
        }
    }

    // TODO: Add app logic to retrieve a mixed bag of tweets from the database and add them to the request's tweets property

    let insightsService: InsightsService = new InsightsService();
    let insights: GetInsightsForFileOutput;
    try {
        insights = await insightsService.getInsightsForFile(request) as GetInsightsForFileOutput;
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to get insights for a mixed bag of tweets. Error: ${error}` })
        }
    }

    // TODO: Add app logic here to save the insights to the database

    return {
        statusCode: 200,
        body: JSON.stringify(insights)
    }
}

export const getInsightsForFileHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.body === null || event.body === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body." })
        }
    }

    let request: GetInsightsForFileInput;
    try {
        request = JSON.parse(event.body) as GetInsightsForFileInput;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: `Invalid request body. Error: ${error}` })
        }
    }

    // TODO: Add app logic to retrieve the tweets from the file in S3 and add them to the request's tweets property

    let insightsService: InsightsService = new InsightsService();
    let insights: GetInsightsForFileOutput;
    try {
        insights = await insightsService.getInsightsForFile(request) as GetInsightsForFileOutput;
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to get insights for file. Error: ${error}` })
        }
    }

    // TODO: Add app logic here to save the insights to the database

    return {
        statusCode: 200,
        body: JSON.stringify(insights)
    }
}

export const getDashboardInsightsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.body === null || event.body === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body." })
        }
    }

    let request: GetDashboardInsightsInput;
    try {
        request = JSON.parse(event.body) as GetDashboardInsightsInput;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: `Invalid request body. Error: ${error}` })
        }
    }

    let insightsService: InsightsService = new InsightsService();
    let insights: GetDashboardInsightsOutput;
    try {
        insights = await insightsService.getDashboardInsights(request) as GetDashboardInsightsOutput;
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to get dashboard insights. Error: ${error}` })
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(insights)
    }
}
