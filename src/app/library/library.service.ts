import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BookData} from '../books/book.data';

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

  /**
   * GETs books in library
   * @param id the user ID
   */
  public getLibrary(userId) {
    const url = environment.apiUri + '/library/getLibrary?userId=' + userId;

    return this.http.get(url);
  }
}
