import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._booksService.getBooks()
            .then(books => this.books = books);
    }
}