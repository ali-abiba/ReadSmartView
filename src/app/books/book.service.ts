import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {BookData} from './book.data';
import {Observable} from 'rxjs/internal/Observable';
@Injectable()
export class BookService {
  constructor(private http: HttpClient) {
  }

  /**
   * Method to retrieve all books
   **/
  public getBooks() {
    const url = environment.apiUri + '/books/getBooks';

    return this.http.get(url);
  }

  /**
   * GETs book data from 3rd party API based on the ISBN
   * @param isbn
   * @return {Observable<Object>}
   */
  public searchBookByIsbn(isbn):Observable<any> {
    const url = 'https://openlibrary.org/api/books';
    let params = new HttpParams();
    params = params.append('bibkeys', 'ISBN:' + isbn);
    params = params.append('format', 'json');
    params = params.append('jscmd', 'data');

    return this.http.get(url, {params: params});
  }

  /**
   * GETs book by title
   * @param title the title of book
   * @return {Observable<Object>}
   */
  public getBookByTitle(title: string): Observable<any> {
    const url = environment.apiUri + '/books/getBookByTitle';
    let params = new HttpParams().set('title', title);

    return this.http.get(url, {params: params});
  }

  /**
   * GETs a book by its isbn
   * @param isbn the isbn of the book
   * @return {Observable<Object>}
   */
  public getBookByIsbn(isbn: string) {
    const url = environment.apiUri + '/books/getBookByIsbn';
    let params = new HttpParams().set('isbn', isbn);

    return this.http.get(url, {params: params});
  }

  /**
   * POSTs new book data to the server.
   * @param book the book data
   * @return {Observable<Object>}
   */
  public addBook(bookData: BookData): Observable<any> {
    const addBookUrl = environment.apiUri + '/books/addBook';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(addBookUrl, {bookData}, httpOptions);
  }
}
