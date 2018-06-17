import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const token = localStorage.getItem('token');

    if(token) {
      const clone = req.clone({
        headers: req.headers.set('authorization', 'bearer ' + token)
      });

      return next.handle(clone);
    }else{
      return next.handle(req);
    }
  }
}
