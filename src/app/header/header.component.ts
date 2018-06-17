import {Component} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-component',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {
  constructor(private authSerivce: AuthService, private router: Router){
  }

  logout(){
    this.authSerivce.logout();
    this.router.navigate(['/landing']);
  }
}
