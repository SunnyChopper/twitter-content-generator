import Tweet from "/contracts/Tweet";

export interface GetDashboardInsightsInputInterface {
    tweets: Tweet[];
}

export class GetDashboardInsightsInput implements GetDashboardInsightsInputInterface {
    tweets: Tweet[];

    constructor(tweets: Tweet[]) {
        this.tweets = tweets;
    }
}

export interface GetDashboardInsightsOutputInterface {
    summary: string;
    insights: string[];
}

export class GetDashboardInsightsOutput implements GetDashboardInsightsOutputInterface {
    summary: string;
    insights: string[];

    constructor(summary: string, insights: string[]) {
        this.summary = summary;
        this.insights = insights;
    }
}