import { Component } from '@angular/core';

@Component ({
    moduleId: module.id,
    selector: 'books-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a routerLink="/" routerLinkActive="active">Books</a>
        </nav>
        <router-outlet></router-outlet>
    `
})

export class AppComponent {
    title = 'Books';
}