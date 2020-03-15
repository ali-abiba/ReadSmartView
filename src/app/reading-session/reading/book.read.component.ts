import {Component, OnInit} from '@angular/core';
import {BookData} from '../../books/book.data';
import {BookService} from '../../books/book.service';
import {ActivatedRoute} from '@angular/router';
import {pipe, timer} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ReadingSessionData} from '../ReadingSessionData';
import * as moment from 'moment';
import {LibraryService} from '../../library/library.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-book-read',
  templateUrl: 'book.read.component.html',
  styleUrls: ['book.read.component.css']
})
export class BookReadComponent implements OnInit {
  session = new ReadingSessionData();
  bookId: string;
  userId: string;
  libraryId: string;
  isReading = false;
  startTime;
  endTime;

  constructor(private libraryService: LibraryService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('bookId');
    this.userId = this.authService.getUserId();

    this.libraryService.getLibraryEntry(this.userId, this.bookId).subscribe( (res) => {
      this.libraryId = res.idLibrary;
    });
  }

  startReading() {
    this.isReading = true;
    this.startTime = moment().format('HH:mm');
  }

  stopReading() {
    this.isReading = false;
    this.endTime = moment().format('HH:mm.ss a');
  }
}
