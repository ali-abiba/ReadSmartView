import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {
  }

  /**
   * GETs user by email
   */
  public getUserByEmail(email: string) {
    const url = environment.apiUri + '/users/getUserByEmail';

  }

  /**
   * Saves email for email updates
   */
  public addEmail(email: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(`${environment.mailHandleUrl}/mail/add-email`,{email: this.email}, httpOptions).subscribe(res => {
      console.log(res);
    });
  }
}
