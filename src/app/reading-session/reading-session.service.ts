import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReadingSessionData} from './ReadingSessionData';
import {environment} from '../../environments/environment';
import {Observable, ObservedValueOf} from 'rxjs';

@Injectable()
export class ReadingSessionService {
  constructor(private http: HttpClient) {
  }

  addSession(session: ReadingSessionData): Observable<any> {
    return this.http.post(`${environment.apiUri}/session/add-session`, session);
  }
}
