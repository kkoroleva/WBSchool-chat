import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private auth: AuthService) {}

       intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const newReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
        });
    
        return next.handle(newReq)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            if ((err.status === 401 && err.url != "https://www.wbschool-chat.ru/api/users/me/newPass") || (err.url?.substring(0, 39) == "https://www.wbschool-chat.ru/api/users/" && err.url.length == 63)) {
              this.auth.logout();
              this.router.navigateByUrl('/login');
            }
            return throwError(() => err);
          })
        );
      }
}