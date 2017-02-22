import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';

@Component({
    moduleId: module.id,
    selector: 'books-list',
    templateUrl: 'books-list.component.html'
})

export class BooksListComponent implements OnInit {

    books: Book[] = [];

    constructor(
        private _booksService: BooksService,
        private _route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        let repo = this._route.snapshot.queryParams['repo'];

        this._booksService.getBooks(repo)
            .then(books => this.books = books);
    
    }
}