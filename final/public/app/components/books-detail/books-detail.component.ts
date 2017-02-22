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
        let id = this._route.snapshot.params['id'];
        let repo = this._route.snapshot.queryParams['repo'];
        
        if (!!id) {
            this._booksService.getBook(id, repo)
                .then(book => {
                    this.book = book;
                });
        } else
            this.book = new Book();
    }
}