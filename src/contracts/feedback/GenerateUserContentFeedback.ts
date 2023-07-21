export interface GenerateUserContentFeedbackInputInterface {
    generatedContent: string;
    topPerformingContent?: string[];
}

export class GenerateUserContentFeedbackInput implements GenerateUserContentFeedbackInputInterface { 
    generatedContent: string;
    topPerformingContent?: string[];

    constructor(generatedContent: string, topPerformingContent?: string[]) {
        this.generatedContent = generatedContent;
        this.topPerformingContent = topPerformingContent;
    }
}

export interface GenerateUserContentFeedbackOutputInterface {
    ideas: string[];
}

export class GenerateUserContentFeedbackOutput implements GenerateUserContentFeedbackOutputInterface {
    ideas: string[];

    constructor(ideas: string[]) {
        this.ideas = ideas;
    }
}