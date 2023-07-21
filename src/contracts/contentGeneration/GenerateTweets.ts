export interface GenerateTweetsInputInterface {
    tweets: string[];
    bio?: string;
    avatar?: object;
    feedback?: object;
}

export class GenerateTweetsInput implements GenerateTweetsInputInterface {
    tweets: string[];
    bio?: string;
    avatar?: object;
    feedback?: object;

    constructor(tweets: string[], bio?: string, avatar?: object, feedback?: object) {
        this.tweets = tweets;
        this.bio = bio;
        this.avatar = avatar;
        this.feedback = feedback;
    }
}

export interface GenerateTweetsOutputInterface {
    replies: string[];
}


export class GenerateTweetsOutput implements GenerateTweetsOutputInterface { 
    replies: string[];

    constructor(replies: string[]) {
        this.replies = replies;
    }
}