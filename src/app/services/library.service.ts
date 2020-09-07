import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BookData} from '../models/book.data';
import {Observable} from 'rxjs';

@Injectable()
export class LibraryService {
  constructor(private http: HttpClient) {
  }

  /**
   * POSTs data to library
   */
  public addToLibrary(userId, bookId) {
    const url = environment.apiUri + '/library/addToLibrary';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, {
      userId: Number(userId),
      bookId: Number(bookId)
    }, httpOptions);
  }

  getLibraryEntry(userId: string, bookId: string): Observable<any> {
    const url = environment.apiUri + '/library/get-library-entry';
    const params = new HttpParams().set('userId', userId).set('bookId', bookId);

    return this.http.get(url, {params: params});
  }

  /**
   * GETs books in library
   * @param userId the user ID
   */
  public getLibrary(userId) {
    const url = environment.apiUri + '/library/get-library?userId=' + userId;

    return this.http.get(url);
  }
}
