import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BookService} from '../../services/book.service';
import {BookData} from '../../models/book.data';
import {LibraryService} from '../../services/library.service';
import {MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {GenreService} from '../../services/genre.service';
import {GenreData} from '../../models/genre.data';

@Component({
  selector: 'app-book-add-component',
  templateUrl: 'book.add.component.html',
  styleUrls: ['book.add.component.css']
})
export class BookAddComponent implements OnInit {
  book: BookData = new BookData();
  title: string;
  authors: string;
  genres: Array<GenreData>;

  constructor(private bookService: BookService, private libraryService: LibraryService, private genreService: GenreService,
              private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.genreService.getGenres().subscribe(response => {
      if (response instanceof Array) {
        this.genres = response;
      }
    });
  }

  searchForIsbn(isbn: string) {
    isbn = isbn.replace('-', '');
    this.bookService.searchBookByIsbn(isbn).subscribe(response => {
      let data = response['ISBN:' + isbn];
      console.log(data);
      if (data) {
        this.book.title = data.title;
        this.book.isbn = isbn;
        this.book.cover = data.cover.large;

        this.book.author = '';
        data.authors.forEach(author => {
          this.book.author += author.name + ' ';
        });
      } else {
        this.snackBar.open('Can\'t find a book with that ISBN');
      }
    });
  }

  // TODO: This is hideous and needs to be redone
  saveBook() {
    this.bookService.addBook(this.book).subscribe(response => {
      if (response) {
        // tslint:disable-next-line:no-shadowed-variable
        this.libraryService.addToLibrary(localStorage.getItem('userId'), response).subscribe(response => {
          this.snackBar.open('Successfully added ' + this.book.title + ' to your library', 'Awesome!', {duration: 5000});
        }, (err: HttpErrorResponse) => {
          console.error(err.error);
          this.snackBar.open('There was a problem saving the book, try again later', 'Oops', {duration: 5000});
        });
      }
    }, (err: HttpErrorResponse) => {
      console.error(err.error);
      this.snackBar.open('There was a problem saving the book, try again later', 'Oops', {duration: 5000});
    });
  }
}
