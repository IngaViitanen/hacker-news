export type SearchApiResult = {
    nbPages: number;
    page: number;
    hits: Article[]
}

export type Article = {
    author: string;
    title?: string;
    story_title?: string;
    url?: string;
    story_url?: string;
    points: number;
    created_at: Date;
}