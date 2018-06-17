import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {BookListComponent} from "./books/book.list.component";
import {BookService} from "./books/book.service";
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
  MatTableModule,
  MatSnackBarModule, MatMenuModule, MatToolbarModule
} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import {UserLoginComponent} from "./auth/auth.login.component";
import {AuthService} from "./auth/auth.service";
import {RouterModule, Routes} from "@angular/router";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {AuthGuardService} from "./auth/auth.guard.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersNewUserComponent} from "./users/users.new.user.component";
import {UsersService} from "./users/users.service";
import {LandingComponent} from "./landing/landing.component";
import {HomeComponent} from "./home/home.component";
import {BookAddComponent} from "./books/book.add.component";

const appRoutes: Routes = [
  {path:'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path:'book-list', component: BookListComponent, canActivate: [AuthGuardService]},
  {path:'create-user', component: UsersNewUserComponent},
  {path:'login', component:UserLoginComponent},
  {path:'landing', component:LandingComponent},
  {path: '', redirectTo: '/landing', pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent, BookListComponent, BookAddComponent, UserLoginComponent, LandingComponent, HeaderComponent, FooterComponent, UsersNewUserComponent, HomeComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule, MatProgressSpinnerModule, HttpClientModule, MatFormFieldModule, MatTableModule,
    MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatSnackBarModule, BrowserAnimationsModule, MatMenuModule, MatToolbarModule
  ],
  providers: [BookService, AuthService, AuthGuardService, FormBuilder, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
