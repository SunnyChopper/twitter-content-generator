import Tweet from "/contracts/Tweet";

export interface GetInsightsForFileInputInterface {
    fileId: string;
    tweets?: Tweet[];
}

export class GetInsightsForFileInput implements GetInsightsForFileInputInterface {
    fileId: string;
    tweets?: Tweet[];

    constructor(fileId: string, tweets?: Tweet[]) {
        this.fileId = fileId;
        this.tweets = tweets;
    }
}

export interface GetInsightsForFileOutputInterface {
    summary: string;
    insights: string[];
}

export class GetInsightsForFileOutput implements GetInsightsForFileOutputInterface {
    summary: string;
    insights: string[];

    constructor(summary: string, insights: string[]) {
        this.summary = summary;
        this.insights = insights;
    }
}