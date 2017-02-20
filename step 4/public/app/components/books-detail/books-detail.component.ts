import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';

@Component({
    moduleId: module.id,
    selector: 'books-detail',
    templateUrl: 'books-detail.component.html'
})

export class BooksDetailComponent implements OnInit {

    book: Book;

    constructor(
        private _booksService: BooksService,
        private _route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            if (!!id) {
                this._booksService.getBook(id)
                    .then(book => {
                        this.book = book;
                    });
            } else
                this.book = new Book();
        });
    }
}