import ContentGenerationService from "/opt/services/ContentGenerationService";
import { GenerateRepliesInput, GenerateRepliesOutput } from "/contracts/GenerateReplies";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const generateRepliesHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.body === null || event.body === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body." })
        }
    }
    
    let request: GenerateRepliesInput | null = null;
    try {
        request = JSON.parse(event.body) as GenerateRepliesInput;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: `Invalid request body. Error: ${error}` })
        }
    }

    if (request === null) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body." })
        }
    }

    let contentGenerationService: ContentGenerationService = new ContentGenerationService();
    let replies: GenerateRepliesOutput | null = null;
    try {
        replies = await contentGenerationService.generateReplies(request);
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to generate replies. Error: ${error}` })
        }
    }

    if (replies === null) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to generate replies." })
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(replies)
    }
}
