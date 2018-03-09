import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable()
export class BookService {

  constructor(private http: HttpClient){
  }

  /**
   * Method to retrieve all books
   **/
  public getBooks(){
    const url = environment.apiUri + 'books/getBooks'

    return this.http.get(url);
  }
}
