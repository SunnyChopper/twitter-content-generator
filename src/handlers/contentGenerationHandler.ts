// Services
import ContentGenerationService from "/opt/services/ContentGenerationService";

// Contracts
import { GenerateLongFormThreadsInput, GenerateLongFormThreadsOutput } from "/contracts/contentGeneration/GenerateLongFormThreads";
import { GenerateImageVideoIdeasInput, GenerateImageVideoIdeasOutput } from "/contracts/contentGeneration/GenerateImageVideoIdeas";
import { GetGeneratedContentInput, GetGeneratedContentOutput } from "/contracts/contentGeneration/GetGeneratedContent";
import { GenerateRepliesInput, GenerateRepliesOutput } from "/contracts/contentGeneration/GenerateReplies";
import { GenerateTweetsInput, GenerateTweetsOutput } from "/contracts/contentGeneration/GenerateTweets";

// AWS Lambda
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const getGeneratedContentHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
    // TODO: Add app logic here to get the generated content.
    if (event.body === null || event.body === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body." })
        }
    }

    let request: GetGeneratedContentInput;
    try {
        request = JSON.parse(event.body) as GetGeneratedContentInput;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: `Invalid request body. Error: ${error}` })
        }
    }

    // Pseudo-code for getting the generated content from the database
    // 1. Initialize the database client and connect to the database
    // 2. Define a `GeneratedContent` model that represents the generated content
    // 3. Use the database service along with the ID in the model to retrieve the generated content
    // 4. Close the database connection
    // 5. Return the generated content

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Please implement getGeneratedContentHandler" })
    }
}

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

    let contentGenerationService: ContentGenerationService = new ContentGenerationService();
    let replies: GenerateRepliesOutput;
    try {
        replies = await contentGenerationService.generateReplies(request) as GenerateRepliesOutput;
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to generate replies. Error: ${error}` })
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
        tweets = await contentGenerationService.generateTweets(request) as GenerateTweetsOutput;
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to generate tweets. Error: ${error}` })
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
        threads = await contentGenerationService.generateLongFormThreads(request) as GenerateLongFormThreadsOutput;
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to generate long form threads. Error: ${error}` })
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

    // TODO: Add app logic here to handle the generated image/video ideas.

    return {
        statusCode: 200,
        body: JSON.stringify(ideas)
    }
}
