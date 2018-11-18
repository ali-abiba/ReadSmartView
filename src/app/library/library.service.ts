import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {enterView} from "@angular/core/src/render3/instructions";
import {environment} from "../../environments/environment";
import 'rxjs/add/operator/map'
import {BookData} from "../books/book.data";

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
        'Content-Type':  'application/json'
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
