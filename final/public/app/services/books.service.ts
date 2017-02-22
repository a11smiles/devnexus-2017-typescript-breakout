import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Book } from '../models/book';
import { Config } from '../app.config';

@Injectable()
export class BooksService {
    private headers: Headers;

    constructor(private _http: Http) { 
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

     getBooks(repo?: string): Promise<Book[]> {
        return this._http.get(Config.apiServerUrl + '/books' + (repo ? '?repo=' + repo : '' ), { headers: this.headers })
                   .toPromise()
                   .then(response => response.json() as Book[])
                   .catch(this.handleError);
    }

    getBook(id: string, repo?: string): Promise<Book> {
        return this._http.get(Config.apiServerUrl + '/books/' + id + (repo ? '?repo=' + repo : '' ), {headers: this.headers })
                    .toPromise()
                    .then(response => response.json() as Book)
                    .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}