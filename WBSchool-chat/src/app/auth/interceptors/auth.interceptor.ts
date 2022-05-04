import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private auth: AuthService,
    @Inject('API_URL') public apiUrl: string
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    });
    console.log(req)
    console.log(newReq)
    return next.handle(newReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (
          err.status === 401 &&
          err.url != `${this.apiUrl}/api/users/me/newPass`
        ) {
          this.auth.logout();
          this.router.navigateByUrl('/auth/login');
        }
        return throwError(() => err);
      })
    );
  }
}
