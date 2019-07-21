import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "./../book.service";
import {BookData} from "./../book.data";

@Component({
  selector: 'app-book-info-component',
  templateUrl: './book.info.component.html',
  styleUrls: ['./book.info.component.css']
})
export class BookInfoComponent implements OnInit{
  isbn: string;
  book: BookData;
  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService) {
  }

  ngOnInit() {
    this.isbn = this.activatedRoute.snapshot.paramMap.get('isbn');

    this.bookService.getBookByIsbn(this.isbn).subscribe(response => {
        this.book = <BookData>response;
        console.log(response);
    });
  }
}
