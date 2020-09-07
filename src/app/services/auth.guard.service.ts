import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import * as moment from 'moment';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate() {
    return this.checkLogin(this.router.url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn()) {
      if (!this.authService.getExpiration().isAfter(moment().format())) {
        return false;
      }
      return true;
    }

    this.authService.redirectUrl = url;

    this.router.navigate(['login']);
    return false;
  }
}
