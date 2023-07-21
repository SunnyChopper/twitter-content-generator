export interface CreateAvatarInputInterface {
    fileIds: string[];
    tweets?: string[];
}

export class CreateAvatarInput implements CreateAvatarInputInterface {
    fileIds: string[];
    tweets?: string[];

    constructor(fileIds: string[], tweets?: string[]) {
        this.fileIds = fileIds;
        this.tweets = tweets;
    }
}

export interface CreateAvatarOutputInterface {
    patterns: Patterns;
    avatar: StyleToneVoice;
    themesAndTopics: ThemesAndTopics;
}

export interface Patterns {
    contentTrends: string[];
    stylisticPatterns: string[];
    formatPatterns: string[];
    languagePatterns: string[];
}

export interface StyleToneVoice { 
    languageStyle: {
        sentenceLength: string;
        punctuationUsage: {
            exclamationMark: string;
            ellipsis: string;
            questionMark: string;
            period: string;
            comma: string;
        }
        capitalization: string;
    }
    tone: string;
    slangJargonUsage: string;
    emojiUsage: string;
    linkMediaUsage: string;
    grammarSyntax: {
        sentenceType: string;
        contractionUsage: string;
    }
    topicPreference: string;
    interactivity: {
        questions: string;
        polls: string;
    }
    tweetTimingFrequency: {
        frequency: string;
        timing: string;
    }
    retweetQuoteBehavior: {
        retweets: string;
        quoteTweets: string;
    }
    hashtagUsage: string;
    mentioningOthers: string;
    relatedCharacteristics: {
        [key: string]: string;
    }
}

export interface ThemesAndTopics { 
    extracted: string[];
    related: string[];
}

export class CreateAvatarOutput implements CreateAvatarOutputInterface {
    patterns: Patterns;
    avatar: StyleToneVoice;
    themesAndTopics: ThemesAndTopics;

    constructor(patterns: Patterns, avatar: StyleToneVoice, themesAndTopics: ThemesAndTopics) {
        this.patterns = patterns;
        this.avatar = avatar;
        this.themesAndTopics = themesAndTopics;
    }
}