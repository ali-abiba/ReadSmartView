import {Component} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {UsersService} from "./../users.service";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-user-new-user',
  templateUrl: 'users.new.user.component.html'
})

export class UsersNewUserComponent {
  missingField = false;
  passwordIsNotMatch = false;
  errorMessage: string;
  errorTitle: string;

  formData = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    passwordConfirm: new FormControl()
  });

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar){
  }

  createUser(userInfo){
    const val = this.formData.value;

    if(val.email && val.password && val.passwordConfirm) {
      this.missingField === false;
      if(val.password === val.passwordConfirm) {
        this.authService.addUser(userInfo).subscribe(response => {
          this.router.navigate(['/home']);
        },
          error => {
            this.snackBar.open(error.error, error.status, {
              duration: 5000
            });
          });
      } else {
        this.passwordIsNotMatch = true;
      }
      this.missingField = false;
    } else {
      this.missingField = true;
    }
  }
}
