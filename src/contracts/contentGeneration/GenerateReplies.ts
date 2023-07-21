export interface GenerateRepliesInputInterface {
    tweet: string;
    bio?: string;
    replies?: string[];
    avatar?: object;
    feedback?: object;
}

export class GenerateRepliesInput implements GenerateRepliesInputInterface {
    tweet: string;
    bio?: string;
    replies?: string[];
    avatar?: object;
    feedback?: object;

    constructor(tweet: string, bio?: string, replies?: string[], avatar?: object, feedback?: object) {
        this.tweet = tweet;
        this.bio = bio;
        this.replies = replies;
        this.avatar = avatar;
        this.feedback = feedback;
    }

    public toJsonString(): string {
        return JSON.stringify(this);
    }
}

export interface GenerateRepliesOutputInterface {
    replies: string[];
}


export class GenerateRepliesOutput implements GenerateRepliesOutputInterface { 
    replies: string[];

    constructor(replies: string[]) {
        this.replies = replies;
    }
}