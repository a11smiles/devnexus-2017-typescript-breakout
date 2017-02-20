import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
    moduleId: module.id,
    selector: 'books-app',
    templateUrl: 'not-found.component.html',
    providers: [Title]
})

export class NotFoundComponent {

    constructor(private title: Title) {
        this.title.setTitle('Page Not Found');
    }

}