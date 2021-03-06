import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IServerResponse } from '../../../interfaces/profile.settings.interface';
import {
  IPasswordEditData,
  IPasswordOnly,
  IUserDeleteData,
} from '../../../interfaces/account.settings-interface';

@Injectable({
  providedIn: 'root',
})
export class AccountSettingsService {
  private getDataUrl = `${this.apiUrl}/api/users/me`;
  private editPswUrl = `${this.apiUrl}/api/users/me/newPass`;
  private delUserUrl = `${this.apiUrl}/api/users/`;

  constructor(
    private http: HttpClient,
    @Inject('API_URL') public apiUrl: string
  ) {}

  getUsersData(): Observable<IServerResponse> {
    return this.http.get<IServerResponse>(this.getDataUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  editPassword(newPassData: IPasswordEditData): Observable<IServerResponse> {
    return this.http.patch<IServerResponse>(this.editPswUrl, newPassData).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  deleteUser(delUserData: IUserDeleteData): Observable<any> {
    const deletionOptions: IPasswordOnly = {
      body: {
        password: delUserData.password,
      },
    };
    return this.http
      .delete<IServerResponse>(
        this.delUserUrl + delUserData.id,
        deletionOptions
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }
}
