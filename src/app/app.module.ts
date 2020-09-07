import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BookListComponent} from "./components/list/book.list.component";
import {BookService} from "./services/book.service";
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
  MatTableModule,
  MatSnackBarModule, MatMenuModule, MatToolbarModule, MatSelectModule, MatGridListModule, MatCardModule,
  MatDividerModule, MatDialogModule
} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UserLoginComponent} from "./components/login/auth.login.component";
import {AuthService} from "./services/auth.service";
import {RouterModule, Routes} from "@angular/router";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {AuthGuardService} from "./services/auth.guard.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersNewUserComponent} from "./components/newUser/users.new.user.component";
import {UsersService} from "./services/users.service";
import {LandingComponent} from "./components/landing/landing.component";
import {HomeComponent} from "./components/home/home.component";
import {BookAddComponent} from "./components/add/book.add.component";
import {AuthInterceptor} from "./services/auth.interceptor";
import {LibraryService} from "./services/library.service";
import {GenreService} from "./services/genre.service";
import {BookInfoComponent} from './components/info/book.info.component';
import {BookReadComponent} from "./components/reading/book.read.component";
import {EmailDialogComponent} from './components/landing/emailDialog/email-dialog.component';
import {ReadingSessionService} from './services/reading-session.service';

const appRoutes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
   {path: 'login', component: UserLoginComponent},
  {path: 'create-user', component: UsersNewUserComponent},
  {path: 'add-book', component: BookAddComponent, canActivate: [AuthGuardService]},
  {path: 'book-list', component: BookListComponent, canActivate: [AuthGuardService]},
  {path: 'book-info/:bookId', component: BookInfoComponent, canActivate: [AuthGuardService]},
  {path: 'read/:bookId', component: BookReadComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: '/landing', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent, BookListComponent, BookAddComponent, UserLoginComponent, LandingComponent, HeaderComponent, FooterComponent,
    UsersNewUserComponent, HomeComponent, BookInfoComponent, BookReadComponent, EmailDialogComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule, MatProgressSpinnerModule, HttpClientModule, MatFormFieldModule, MatTableModule,
    MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatSnackBarModule, BrowserAnimationsModule, MatMenuModule, MatToolbarModule, MatSelectModule,
    MatGridListModule, MatCardModule, MatDividerModule, MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    BookService, AuthService, AuthGuardService, FormBuilder, UsersService, AuthInterceptor, LibraryService, GenreService, ReadingSessionService],
  entryComponents: [EmailDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
