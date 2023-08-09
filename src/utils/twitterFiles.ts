/**
 * Twitter Files
 * Helper functions to process and query Twitter CSV files, which are stored in S3. These functions
 * assume that you have already downloaded the file from S3 and converted it to a CSV string.
 */

export const getAllTweets = (csvTable: string[][]): string[] => {
    // Look for the column with header "Tweet text"
    const tweetTextColumnIndex = csvTable[0].findIndex(column => column === 'Tweet text');
    if (tweetTextColumnIndex === -1) {
        throw new Error('Could not find column with header "Tweet text"');
    }

    // For all the rows in the table, get the tweet text and add it to the list
    const tweets = [];
    for (let i = 1; i < csvTable.length; i++) {
        const tweetText = csvTable[i][tweetTextColumnIndex];
        tweets.push(tweetText);
    }

    return tweets;
}

export const getContent = (csvTable: string[][]): string[] => {
    // Look for the column with header "Tweet text"
    const tweetTextColumnIndex = csvTable[0].findIndex(column => column === '\"Tweet text\"');
    if (tweetTextColumnIndex === -1) {
        throw new Error('Could not find column with header "Tweet text"');
    }

    // For all the rows in the table, get the tweet text and if it doesn't start with "@", add it to the list
    const content = [];
    for (let i = 1; i < csvTable.length; i++) {
        const tweetText = csvTable[i][tweetTextColumnIndex];
        if (!tweetText.startsWith('@')) {
            content.push(tweetText);
        }
    }

    return content;
}

export const getReplies = (csvTable: string[][]): string[] => {
    // Look for the column with header "Tweet text"
    const tweetTextColumnIndex = csvTable[0].findIndex(column => column === 'Tweet text');
    if (tweetTextColumnIndex === -1) {
        throw new Error('Could not find column with header "Tweet text"');
    }

    // For all the rows in the table, get the tweet text and if it starts with "@", add it to the list
    const replies = [];
    for (let i = 1; i < csvTable.length; i++) {
        const tweetText = csvTable[i][tweetTextColumnIndex];
        if (tweetText.startsWith('@')) {
            replies.push(tweetText);
        }
    }

    return replies;
}