export interface GenerateNewContentFromFeedbackInputInterface {
    generatedContent: string;
    userFeedback: string[];
}

export class GenerateNewContentFromFeedbackInput implements GenerateNewContentFromFeedbackInputInterface { 
    generatedContent: string;
    userFeedback: string[];

    constructor(generatedContent: string, userFeedback: string[]) {
        this.generatedContent = generatedContent;
        this.userFeedback = userFeedback;
    }
}

export interface GenerateNewContentFromFeedbackOutputInterface {
    newContent: string[];
}

export class GenerateNewContentFromFeedbackOutput implements GenerateNewContentFromFeedbackOutputInterface {
    newContent: string[];

    constructor(newContent: string[]) {
        this.newContent = newContent;
    }
}