import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProfileData, IServerResponse } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService {
  private url = "https://www.wbschool-chat.ru/api/users/me"

  constructor(private http: HttpClient) { }

  getUsersData(): Observable<IServerResponse>{
    return this.http.get<IServerResponse>(this.url)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    )
  }

  editProfileSettings(formData: IProfileData): Observable<IServerResponse> {
    return this.http.patch<IServerResponse>(this.url, formData)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    )
  }
}
