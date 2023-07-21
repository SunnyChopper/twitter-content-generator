export interface GenerateLongFormThreadsInputInterface {
    tweets: string[];
    bio?: string;
    avatar?: object;
    feedback?: object;
}

export class GenerateLongFormThreadsInput implements GenerateLongFormThreadsInputInterface {
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

export interface LongFormThread {
    threadTitle: string;
    threadDescription: string;
    threadRationale: string;
    thread: string[];
}

export interface GenerateLongFormThreadsOutputInterface {
    threads: LongFormThread[];
}


export class GenerateLongFormThreadsOutput implements GenerateLongFormThreadsOutputInterface { 
    threads: LongFormThread[];

    constructor(threads: LongFormThread[]) {
        this.threads = threads;
    }
}