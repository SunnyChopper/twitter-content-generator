import { APIGatewayProxyEvent } from "aws-lambda";

export const getCurrentUserId = (event: APIGatewayProxyEvent): string | undefined => {
    return event.requestContext.authorizer?.claims?.sub as string | undefined;
}