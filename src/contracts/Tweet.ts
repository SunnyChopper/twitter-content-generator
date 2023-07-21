export default interface Tweet {
    tweet: string;
    engagementMetrics: {
        retweets: number;
        favorites: number;
        replies: number;
        bookmarks: number;
        engagementRate: number;
    }
}