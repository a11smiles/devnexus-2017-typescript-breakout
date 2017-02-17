import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksDetailComponent } from './components/books-detail/books-detail.component';

const appRoutes: Routes = [
  {
    path: 'book/:id',
    component: BooksDetailComponent
  },
  {
    path: '',
    component: BooksListComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);