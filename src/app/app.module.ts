import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {BookListComponent} from "./books/book.list.component";
import {BookService} from "./books/book.service";
import {MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatTableModule} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent, BookListComponent
  ],
  imports: [
    BrowserModule, MatProgressSpinnerModule, HttpClientModule, MatFormFieldModule, MatTableModule,
    MatInputModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
