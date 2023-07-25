// Services
import FeedbackService from "/opt/services/FeedbackService";

// Contracts
import { GenerateNewContentFromFeedbackInput, GenerateNewContentFromFeedbackOutput } from "/contracts/feedback/GenerateNewContentFromFeedback";
import { GenerateUserContentFeedbackInput, GenerateUserContentFeedbackOutput } from "/contracts/feedback/GenerateUserContentFeedback";

// AWS Lambda
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const generateUserContentFeedbackHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
    if (event.body === null || event.body === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body." })
        }
    }

    let request: GenerateUserContentFeedbackInput;
    try {
        request = JSON.parse(event.body) as GenerateUserContentFeedbackInput;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: `Invalid request body. Error: ${error}` })
        }
    }

    let feedbackService: FeedbackService = new FeedbackService();
    let feedback: GenerateUserContentFeedbackOutput;
    try {
        feedback = await feedbackService.generateUserContentFeedback(request) as GenerateUserContentFeedbackOutput;
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to generate user content feedback. Error: ${error}` })
        }
    }

    // TODO: Add app logic here to handle the generated feedback for the user content. 

    return {
        statusCode: 200,
        body: JSON.stringify(feedback)
    }
}

export const generateNewContentFromFeedbackHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
    if (event.body === null || event.body === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body." })
        }
    }

    let request: GenerateNewContentFromFeedbackInput;
    try {
        request = JSON.parse(event.body) as GenerateNewContentFromFeedbackInput;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: `Invalid request body. Error: ${error}` })
        }
    }

    let feedbackService: FeedbackService = new FeedbackService();
    let newContent: GenerateNewContentFromFeedbackOutput;
    try {
        newContent = await feedbackService.generateNewContentFromFeedback(request) as GenerateNewContentFromFeedbackOutput;
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to generate new content from feedback. Error: ${error}` })
        }
    }

    // TODO: Add app logic here to handle the generated new content.

    return {
        statusCode: 200,
        body: JSON.stringify(newContent)
    }
}

export const getFeedbackHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
    // TODO: Add app logic here to get a piece of feedback submitted by the user.
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Please implement getFeedbackHandler" })
    }
}

export const submitFeedbackHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Add app logic here to save a piece of feedback submitted by the user.
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Please implement submitFeedbackHandler" })
    }
}

export const updateFeedbackHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Add app logic here to update a piece of feedback submitted by the user.
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Please implement updateFeedbackHandler" })
    }
}

export const deleteFeedbackHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Add app logic here to delete a piece of feedback submitted by the user.
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Please implement deleteFeedbackHandler" })
    }
}
