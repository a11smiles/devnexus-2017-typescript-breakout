import * as fs from 'fs';
import * as xml2js from 'xml2js';
import { Book, IBook } from '../interfaces/books';

export class Books implements IBook {
    constructor() { }

    private readBooks(): Promise<Book[]> {
        return new Promise<Book[]>((resolve, reject) => {
            fs.readFile(__dirname + '/data.xml', (err, data) => {
                if (err) reject(err);
                else {
                    let parser = new xml2js.Parser();
                    
                    parser.parseString(data, (err: any, result: any) => {
                        if (err) reject(err);
                        else {
                            let formatted = this.formatData(result);
                            resolve(formatted);
                        }
                    });
                }
            })
        });
    }

    private formatData(data: any): Book[] {
        let books: Book[] = [];

        data.books.book.forEach((el: any) => {
            let book: Book = new Book();
            book.id = el["$"].id;
            book.name = el.name[0];
            book.author = el.author[0];
            book.publishedDate = new Date(el.publishedDate[0]);
            book.cover = el.cover[0];
            books.push(book);
        })

        return books;
    }

    public get(id: string): Promise<Book> {
        return new Promise<Book>((resolve, reject) => {
            this.readBooks().then((data) => {
                let found = data.filter((b: Book) => { return b.id == id; })[0];
                resolve(found);
            }).catch((e) => {
                reject(e);
            })
        });
    } 

    public getAll(): Promise<Book[]> {
        return new Promise<Book[]>((resolve, reject) => {
            this.readBooks().then((data) => {
                resolve(data);
            }).catch((e) => {
                reject(e);
            })
        });
    } 
}