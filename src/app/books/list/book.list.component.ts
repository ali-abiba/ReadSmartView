import {Component, OnInit} from "@angular/core";
import {BookData} from "./../book.data";
import {MatTableDataSource} from "@angular/material";
import {LibraryService} from "../../library/library.service";

  @Component({
    selector: 'app-book-list-component',
    templateUrl: './book.list.component.html',
    styleUrls: ['./book.list.component.css']
  })
  export class BookListComponent implements OnInit {
    books: Array<BookData>;

    constructor(private libraryService: LibraryService) {
    }

    ngOnInit(){
      this.libraryService.getLibrary(localStorage.getItem('userId')).subscribe(response => {
        this.books = response as Array<BookData>;

      });
    }
  }
