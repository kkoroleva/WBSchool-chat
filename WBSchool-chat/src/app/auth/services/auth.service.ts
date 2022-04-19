import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { INewUser, User } from '../interfaces';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlLogin = 'https://wbschool-chat.ru/api/signin';
  private urlRegister = 'https://wbschool-chat.ru/api/signup';

  constructor(private http: HttpClient, private storage: StorageMap) { }

  login(user: User): Observable<INewUser> {
    return this.http.post<INewUser>(this.urlLogin, user)
    .pipe(
      tap((res: INewUser) => this.setToken(res)),
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
    localStorage.clear();
    this.storage.clear().subscribe(() => {});
  }
}
