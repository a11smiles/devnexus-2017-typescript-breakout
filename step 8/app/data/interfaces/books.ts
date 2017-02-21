export class Book {
    id: string;
    name: string;
    author: string;
    publishedDate: Date;
    cover: string;

    constructor() {}
}

export interface IBook {
    get(id: string): Promise<Book>;
    getAll(): Promise<Book[]>;
}