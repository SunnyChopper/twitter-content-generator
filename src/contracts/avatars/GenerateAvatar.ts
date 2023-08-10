export interface GenerateAvatarInputInterface {
    userId?: string;
    fileKey: string;
}

export class GenerateAvatarInput implements GenerateAvatarInputInterface {
    userId?: string;
    fileKey: string;

    constructor(fileKey: string) {
        this.fileKey = fileKey;
    }
}

export interface GenerateAvatarOutputInterface {
    patterns: Patterns;
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

export class GenerateAvatarOutput implements GenerateAvatarOutputInterface {
    patterns: Patterns;
    themesAndTopics: ThemesAndTopics;

    constructor(patterns: Patterns, themesAndTopics: ThemesAndTopics) {
        this.patterns = patterns;
        this.themesAndTopics = themesAndTopics;
    }
}