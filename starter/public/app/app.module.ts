import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { routing }       from './app.routing';
import { AppComponent } from './components/app/app.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksDetailComponent } from './components/books-detail/books-detail.component';
import { BooksService } from './services/books.service';

@NgModule({
  imports:      [ 
      BrowserModule,
      FormsModule,
      HttpModule,
      routing
  ],
  declarations: [ 
      AppComponent,
      BooksListComponent,
      BooksDetailComponent
  ],
  providers:    [
      BooksService
  ],
  bootstrap:    [ 
      AppComponent 
  ]
})

export class AppModule { }
