export interface GenerateImageVideoIdeasFeedbackItem {
    idea: string;
    reason: string;
}

export interface GenerateImageVideoIdeasFeedback {
    acceptedVisualContentIdeas: GenerateImageVideoIdeasFeedbackItem[];
    rejectedVisualContentIdeas: GenerateImageVideoIdeasFeedbackItem[];
}

export interface GenerateImageVideoIdeasInputInterface { 
    tweets: string[];
    bio?: string;
    avatar?: object;
    feedback?: GenerateImageVideoIdeasFeedback;
}

export class GenerateImageVideoIdeasInput implements GenerateImageVideoIdeasInputInterface { 
    tweets: string[];
    bio?: string;
    avatar?: object;
    feedback?: GenerateImageVideoIdeasFeedback;

    constructor(tweets: string[], bio?: string, avatar?: object, feedback?: GenerateImageVideoIdeasFeedback) {
        this.tweets = tweets;
        this.bio = bio;
        this.avatar = avatar;
        this.feedback = feedback;
    }
}

export interface GenerateImageVideoIdeasOutputInterface {
    ideas: string[];
}


export class GenerateImageVideoIdeasOutput implements GenerateImageVideoIdeasOutputInterface { 
    ideas: string[];

    constructor(ideas: string[]) {
        this.ideas = ideas;
    }
}