import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IServerResponse } from 'src/app/profile-settings/interfaces/interface';
import { IPasswordEditData } from '../interface/account-settings';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {
  private getDataUrl = "http://www.wbschool-chat.ru/users/me"
  private editPswUrl = "http://www.wbschool-chat.ru/users/me/newPass"

  constructor(private http: HttpClient) { }

  getUsersData(): Observable<IServerResponse>{
    return this.http.get<IServerResponse>(this.getDataUrl)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    )
  }

  editPassword(newPassData: IPasswordEditData): Observable<IServerResponse> {
    return this.http.patch<IServerResponse>(this.editPswUrl, newPassData)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    )
  }
}
