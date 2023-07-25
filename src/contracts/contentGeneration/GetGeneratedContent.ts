export interface GetGeneratedContentInputInterface {
    contentId: string;
}

export class GetGeneratedContentInput implements GetGeneratedContentInputInterface {
    contentId: string;

    constructor(contentId: string) {
        this.contentId = contentId;
    }
}

export interface GetGeneratedContentOutputInterface {
    content: string[];
}

export class GetGeneratedContentOutput implements GetGeneratedContentOutputInterface {
    content: string[];

    constructor(content: string[]) {
        this.content = content;
    }
}