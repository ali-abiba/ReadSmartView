import {CanActivate, Router} from "@angular/router";
import {Injectable, state} from "@angular/core";
import {AuthService} from "./auth.service";
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router){
  }

  canActivate(){
    let url = this.router.url;
    console.log(this.checkLogin(url));
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean{
    if(this.authService.isLoggedIn()) return true;

    this.authService.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }
}
