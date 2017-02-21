import * as loadJsonFile from 'load-json-file';
import { Book, IBook } from '../interfaces/books';

export class Books implements IBook {
    constructor() { }

    public get(id: string): Promise<Book> {
        return new Promise<Book>((resolve, reject) => {
            loadJsonFile(__dirname + '/data.json').then((json) => {
                let found = json.filter((b: Book) => { return b.id == id; })[0];
                resolve(found);
            }).catch((e) => {
                reject(e);
            });
        });
    } 

    public getAll(): Promise<Book[]> {
        return new Promise<Book[]>((resolve, reject) => {
            loadJsonFile(__dirname + '/data.json').then((json) => {
                resolve(json);
            }).catch((e) => {
                reject(e);
            });
        });
    } 
}