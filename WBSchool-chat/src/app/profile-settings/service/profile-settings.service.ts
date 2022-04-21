import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProfileData, IServerResponse } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileSettingsService {
  private url = `${this.apiUrl}/api/users/me`;

  constructor(
    private http: HttpClient,
    @Inject('API_URL') public apiUrl: string
  ) {}

  // getUsersData(): Observable<IServerResponse> {
  //   return this.http.get<IServerResponse>(this.url).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       return throwError(() => error);
  //     })
  //   );
  // }

  editProfileSettings(formData: IProfileData): Observable<IServerResponse> {
    return this.http.patch<IServerResponse>(this.url, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
