import {Component} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {UsersService} from '../../users/users.service';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css']
})
export class EmailDialogComponent {
  email: string;

  constructor(private dialogRef: MatDialogRef<EmailDialogComponent>, private usersService: UsersService,
              private snackBar: MatSnackBar) {
  }


  close() {
    this.dialogRef.close();
  }

  save() {
    this.usersService.addEmail(this.email).subscribe(res => {
      this.close();
      this.snackBar.open('Thank you, we will keep you updated', 'OK', {duration: 5000});
    }, error => {
      this.snackBar.open('There was an issue. Please try again.', 'Oops!', {duration: 5000});
    });
  }
}
