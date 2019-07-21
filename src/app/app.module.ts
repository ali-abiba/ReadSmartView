import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BookListComponent} from "./books/list/book.list.component";
import {BookService} from "./books/book.service";
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
  MatTableModule,
  MatSnackBarModule, MatMenuModule, MatToolbarModule, MatSelectModule, MatGridListModule, MatCardModule,
  MatDividerModule
} from "@angular/material";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UserLoginComponent} from "./auth/login/auth.login.component";
import {AuthService} from "./auth/auth.service";
import {RouterModule, Routes} from "@angular/router";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {AuthGuardService} from "./auth/auth.guard.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersNewUserComponent} from "./users/new/users.new.user.component";
import {UsersService} from "./users/users.service";
import {LandingComponent} from "./landing/landing.component";
import {HomeComponent} from "./home/home.component";
import {BookAddComponent} from "./books/add/book.add.component";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {LibraryService} from "./library/library.service";
import {GenreService} from "./genres/genre.service";
import {BookInfoComponent} from './books/info/book.info.component';
import {BookReadComponent} from "./books/reading/book.read.component";

const appRoutes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: UserLoginComponent},
  {path: 'create-user', component: UsersNewUserComponent},
  {path: 'add-book', component: BookAddComponent, canActivate: [AuthGuardService]},
  {path: 'book-list', component: BookListComponent, canActivate: [AuthGuardService]},
  {path: 'book-info/:isbn', component: BookInfoComponent, canActivate: [AuthGuardService]},
  {path: 'read/:isbn', component: BookReadComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: '/landing', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent, BookListComponent, BookAddComponent, UserLoginComponent, LandingComponent, HeaderComponent, FooterComponent,
    UsersNewUserComponent, HomeComponent, BookInfoComponent, BookReadComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule, MatProgressSpinnerModule, HttpClientModule, MatFormFieldModule, MatTableModule,
    MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatSnackBarModule, BrowserAnimationsModule, MatMenuModule, MatToolbarModule, MatSelectModule,
    MatGridListModule, MatCardModule, MatDividerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    BookService, AuthService, AuthGuardService, FormBuilder, UsersService, AuthInterceptor, LibraryService, GenreService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
