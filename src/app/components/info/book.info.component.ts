import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../services/book.service';
import {BookData} from '../../models/book.data';

@Component({
  selector: 'app-book-info-component',
  templateUrl: './book.info.component.html',
  styleUrls: ['./book.info.component.css']
})
export class BookInfoComponent implements OnInit {
  id: string;
  book: BookData;

  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('bookId');

    this.bookService.getBookById(this.id).subscribe(response => {
      this.book = response as BookData;
      console.log(this.book);
    });
  }
}
