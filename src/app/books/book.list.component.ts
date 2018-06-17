import {Component, OnInit} from "@angular/core";
import {BookService} from "./book.service";
import {BookData} from "./book.data";
import {MatTableDataSource} from "@angular/material";

  @Component({
    selector: 'app-book-list-component',
    templateUrl: './book.list.component.html'
  })

  export class BookListComponent implements OnInit {
    books: Array<BookData>;
    displayedColumns = ['title', 'author', 'genres'];
    dataSource = new MatTableDataSource<BookData>(null);

    constructor(private bookService: BookService) {
    }

    ngOnInit(){
      this.getBooks(() =>{
        this.dataSource = new MatTableDataSource(this.books);
        console.log(this.books);
      });
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }

    getBooks(_callback){
      this.bookService.getBooks().subscribe(response => {
        this.books = response as Array<BookData>;
        if(typeof _callback == 'function'){
          _callback();
        }
      });
    }
  }
