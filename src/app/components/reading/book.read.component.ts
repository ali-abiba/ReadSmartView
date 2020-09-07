import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {interval} from 'rxjs';
import {ReadingSessionData} from '../../models/ReadingSessionData';
import * as moment from 'moment';
import {LibraryService} from '../../services/library.service';
import {AuthService} from '../../services/auth.service';
import {ReadingSessionService} from '../../services/reading-session.service';

@Component({
  selector: 'app-book-read',
  templateUrl: 'book.read.component.html',
  styleUrls: ['book.read.component.css']
})
export class BookReadComponent implements OnInit {
  session = new ReadingSessionData();
  bookId: string;
  userId: string;
  isReading = false;
  timerText: string;

  constructor(private libraryService: LibraryService, private activatedRoute: ActivatedRoute, private authService: AuthService,
              private readingSessionService: ReadingSessionService) {
  }

  ngOnInit() {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('bookId');
    this.userId = this.authService.getUserId();

    this.libraryService.getLibraryEntry(this.userId, this.bookId).subscribe( (res) => {
      this.session.libraryId = res.idlibrary;
      this.startReading();
    });
  }

  startReading() {
    this.isReading = true;
    this.session.startTime = moment().format('HH:mm.ss a');
    this.readingSessionService.addSession(this.session).subscribe(res => {
      this.session.id = res.idSession;
    });

  }

  stopReading() {
    this.isReading = false;
    this.session.endTime = moment().format('HH:mm.ss a');
    this.readingSessionService.sessionHeartbeat(this.session.id, moment().format('HH:mm.ss a')).subscribe();

  }
}
