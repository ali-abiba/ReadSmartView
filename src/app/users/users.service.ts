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
}
