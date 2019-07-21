import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './../auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-login-component',
  templateUrl: 'auth.login.component.html'
})
export class UserLoginComponent implements OnInit {
  missingField = false;
  errorMessage: string;
  errorTitle: string;

  formData = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

  }

  login(loginInfo) {
    const val = this.formData.value;
    if (val.email && val.password) {
      this.missingField = false;
      this.authService.login(loginInfo).subscribe(response => {
          if (this.authService.isLoggedIn()) {
            console.log('redirecting...');
            const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';

            this.router.navigate([redirect]);
          } else {
            this.snackBar.open('I have no idea what went wrong when logging in, please try later.', 'Oops!', {
              duration: 5000,
            });
          }
        },
        error => {
          console.error(error);
          this.errorMessage = error.error;
          this.errorTitle = error.status;
          if (error) {
            this.snackBar.open(this.errorMessage, this.errorTitle, {
              duration: 5000
            });
          } else {
            this.snackBar.open('Looks like the server is down, try again later.', 'Oops', {
              duration: 5000
            });
          }
        });
    } else {
      this.missingField = true;
    }
  }
}
