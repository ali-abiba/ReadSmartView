import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UsersService} from '../../users/users.service';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css']
})
export class EmailDialogComponent {
  email: string;

  constructor(private dialogRef: MatDialogRef<EmailDialogComponent>, private usersService: UsersService) {
  }


  close() {
    this.dialogRef.close();
  }

  save() {
    console.log(this.email);
    this.usersService.addEmail(this.email);
  }
}
