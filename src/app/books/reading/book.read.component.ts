import {Component, OnInit} from "@angular/core";
import {BookService} from "../book.service";
import {ActivatedRoute} from "@angular/router";
import {BookData} from "../book.data";

@Component({
  selector: 'app-book-read',
  templateUrl: 'book.read.component.html',
  styleUrls: ['book.read.component.css']
})
export class BookReadComponent implements OnInit{
  isbn: string;
  book: BookData;
  isReading: boolean = false;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute){
  }

  ngOnInit(){
    this.isbn = this.activatedRoute.snapshot.paramMap.get('isbn');

    this.bookService.getBookByIsbn(this.isbn).subscribe((response) => {
      this.book = <BookData>response;
    });
  }

  startReading(){
    this.isReading = true;
  }

  stopReading(){
    this.isReading = false;
  }

}
