import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlLogin = '';
  private urlRegister = '';

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(this.urlLogin, user)
    .pipe(
      tap((res) => this.setToken(res)),
      catchError(error => {
        console.log('Error: ', error.message);
        return throwError(() => error)
      })
    )
  }

  register(user: User) {
    return this.http.post(this.urlRegister, user)
  }

  setToken(response: any | null) {
    if (response) {
      const expiresDate = new Date(new Date().getTime() + 60000);
      localStorage.setItem('myToken', response.token);
      localStorage.setItem('date', expiresDate.toString());
      if (response.refreshToken != null) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }
    }
  }

  logout() {
    
  }
}
