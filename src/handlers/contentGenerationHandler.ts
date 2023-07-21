// Services
import ContentGenerationService from "/opt/services/ContentGenerationService";

// Contracts
import { GenerateLongFormThreadsInput, GenerateLongFormThreadsOutput } from "/contracts/GenerateLongFormThreads";
import { GenerateImageVideoIdeasInput, GenerateImageVideoIdeasOutput } from "/contracts/GenerateImageVideoIdeas";
import { GenerateRepliesInput, GenerateRepliesOutput } from "/contracts/GenerateReplies";
import { GenerateTweetsInput, GenerateTweetsOutput } from "/contracts/GenerateTweets";

// AWS Lambda
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const generateRepliesHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.body === null || event.body === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body." })
        }
    }
    
    let request: GenerateRepliesInput;
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
    let replies: GenerateRepliesOutput;
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

    // TODO: Add app logic here to handle the generated replies. 

    return {
        statusCode: 200,
        body: JSON.stringify(replies)
    }
}

export const generateTweetsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
    if (event.body === null || event.body === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body." })
        }
    }

    let request: GenerateTweetsInput;
    try {
        request = JSON.parse(event.body) as GenerateTweetsInput;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: `Invalid request body. Error: ${error}` })
        }
    }

    let contentGenerationService: ContentGenerationService = new ContentGenerationService();
    let tweets: GenerateTweetsOutput;
    try {
        tweets = await contentGenerationService.generateTweets(request);
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to generate tweets. Error: ${error}` })
        }
    }

    if (tweets === null) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to generate tweets." })
        }
    }

    // TODO: Add app logic here to handle the generated tweets.

    return {
        statusCode: 200,
        body: JSON.stringify(tweets)
    }
}

export const generateLongFormThreadsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
    if (event.body === null || event.body === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body." })
        }
    }

    let request: GenerateLongFormThreadsInput;
    try {
        request = JSON.parse(event.body) as GenerateLongFormThreadsInput;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: `Invalid request body. Error: ${error}` })
        }
    }

    let contentGenerationService: ContentGenerationService = new ContentGenerationService();
    let threads: GenerateLongFormThreadsOutput;
    try {
        threads = await contentGenerationService.generateLongFormThreads(request);
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to generate long form threads. Error: ${error}` })
        }
    }

    if (threads === null) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to generate long form threads." })
        }
    }

    // TODO: Add app logic here to handle the generated long form threads.

    return {
        statusCode: 200,
        body: JSON.stringify(threads)
    }
}

export const generateImageVideoIdeasHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
    if (event.body === null || event.body === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body." })
        }
    }

    let request: GenerateImageVideoIdeasInput;
    try {
        request = JSON.parse(event.body) as GenerateImageVideoIdeasInput;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: `Invalid request body. Error: ${error}` })
        }
    }

    let contentGenerationService: ContentGenerationService = new ContentGenerationService();
    let ideas: GenerateImageVideoIdeasOutput;
    try {
        ideas = await contentGenerationService.generateImageVideoIdeas(request) as GenerateImageVideoIdeasOutput;
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to generate image/video ideas. Error: ${error}` })
        }
    }

    if (ideas === null) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to generate image/video ideas." })
        }
    }

    // TODO: Add app logic here to handle the generated image/video ideas.

    return {
        statusCode: 200,
        body: JSON.stringify(ideas)
    }
}
