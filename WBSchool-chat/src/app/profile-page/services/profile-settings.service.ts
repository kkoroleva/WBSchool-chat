import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IUserData } from 'src/app/auth/interfaces';
import { IContacts } from 'src/app/store/reducers/contacts.reducers';
import { IProfileData, IServerResponse } from '../interfaces/profile-settings';


@Injectable({
  providedIn: 'root',
})
export class ProfileSettingsService {
  private url = `${this.apiUrl}/api/users/me`;

  constructor(
    private http: HttpClient,
    @Inject('API_URL') public apiUrl: string
  ) {}

  getUsers(userName: string) {
    return this.http.get<IUserData>(`${this.url}/username?username=${userName}`)
  }

  addFriend(userId: string) {
    return this.http.post<IContacts>(`${this.url}/contacts`, {id: userId})
  }

  editProfileSettings(formData: IProfileData): Observable<IServerResponse> {
    return this.http.patch<IServerResponse>(this.url, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}