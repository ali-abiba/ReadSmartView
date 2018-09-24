import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import {BookService} from "./book.service";
import {BookData} from "./book.data";
import {LibraryService} from "../library/library.service";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";
import {GenreService} from "../genres/genre.service";
import {GenreData} from "../genres/genre.data";

@Component({
  selector: 'app-book-add-component',
  templateUrl: 'book.add.component.html',
  styleUrls: ['book.add.component.css']
})
export class BookAddComponent implements OnInit{
  book: BookData = new BookData();
  title: string;
  authors: string;
  genres: Array<GenreData>;

  constructor(private bookService: BookService, private libraryService: LibraryService, private genreService: GenreService, private formBuilder: FormBuilder,
              private snackBar: MatSnackBar){
  }

  ngOnInit() {
    this.genreService.getGenres().subscribe(response => {
      if(response instanceof Array){
        this.genres = response;
      }
    });
  }

  searchForIsbn(isbn){
    this.bookService.getBookByIsbn(isbn).subscribe(response => {
      let data = response['ISBN:'+isbn];
      console.log(data);
      this.book.title = data.title;
      this.book.isbn = isbn;
      this.book.cover = data.cover.large;

      this.book.authors = '';
      data.authors.forEach(author => {
        this.book.authors += author.name + ' ';
      });
    });
  }
  //TODO: This is hideous and needs to be redone
  saveBook() {
    //Check if book exists already
    this.bookService.getBookByTitle(this.book.title).subscribe(response => {

      //If it does exist, just add it to the user's library
      if(response instanceof Array && response.length > 0) {
        this.libraryService.addToLibrary(localStorage.getItem('userId'), response[0].idbooks).subscribe(response => {
          this.snackBar.open('Successfully added ' + this.book.title + ' to your library', 'Awesome!', {duration: 5000});
        }, (err: HttpErrorResponse) => {
          console.error(err.error);
          this.snackBar.open('There was a problem saving the book', 'Oops', {duration:5000});
        });

        //If it does not exist, create it, and add it to the user's library
      } else {
        this.bookService.addBook(this.book).subscribe(response => {
          if(response) {
            this.libraryService.addToLibrary(localStorage.getItem('userId'), response).subscribe(response => {
              this.snackBar.open('Successfully added ' + this.book.title + ' to your library', 'Awesome!', {duration: 5000});
            }, (err: HttpErrorResponse) => {
              console.error(err.error);
              this.snackBar.open('There was a problem saving the book, try again later', 'Oops', {duration:5000});
            })
          }
        }, (err: HttpErrorResponse) => {
          console.error(err.error);
          this.snackBar.open('There was a problem saving the book, try again later', 'Oops', {duration:5000});
        })
      }
    }, (err: HttpErrorResponse) => {
      console.error(err.error);
      this.snackBar.open('There was a problem saving the book, try again later', 'Oops', {duration:5000});
    });
  }
}
