import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class GenreService {
  constructor(private http: HttpClient) {
  }

  /**
   * GETs all genres
   */
  getGenres() {
    const url = environment.apiUri + '/genres/getGenres';
    return this.http.get(url);
  }
}
