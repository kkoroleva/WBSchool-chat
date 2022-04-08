import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlLogin = 'http://51.250.28.102:3001/signin';
  private urlRegister = 'http://51.250.28.102:3001/signup';

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
    .pipe(
      tap((res) => this.setUsersData(res)),
      catchError(error => {
        console.log('Error: ', error.message);
        return throwError(() => error)
      })
    )
  }

  setToken(response: any | null) {
    if (response) {
      const expiresDate = new Date(new Date().getTime());
      localStorage.setItem('token', response.token);
      localStorage.setItem('еmail', response.newUser.email);
      localStorage.setItem('username', response.newUser.username);
      localStorage.setItem('userRights', response.newUser.userRights);
      localStorage.setItem('avatar', response.newUser.avatar);
      localStorage.setItem('about', response.newUser.about);
      localStorage.setItem('date', expiresDate.toString());
      // if (response.refreshToken != null) {
      //   localStorage.setItem('refreshToken', response.refreshToken);
      // }
    }
  }

  setUsersData(response: any | null) {
    if (response) {
      localStorage.setItem('еmail', response.email);
    }
  }

  logout() {

  }
}
