import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IUserData } from '../../../interfaces/auth-interface';
import { IContactsState } from '../../store/reducers/contacts.reducers';
import {
  IProfileData,
  IServerResponse,
} from '../../../interfaces/profile.settings.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileSettingsService {
  private url = `${this.apiUrl}/api/users`;

  constructor(
    private http: HttpClient,
    @Inject('API_URL') public apiUrl: string
  ) {}

  getUsers(userName: string) {
    return this.http.get<IUserData>(
      `${this.url}/username?username=${userName}`
    );
  }

  getOwners(userId: string) {
    // return this.http.post(`${this.apiUrl}/api/chats/owners`, {userId})
    return this.http.post(`${this.apiUrl}/api/chats/privates/owners`, {userId})
  }

  getContacts() {
    return this.http.get<IUserData>(`${this.url}/contacts`);
  }

  addFriend(userId: string) {
    return this.http.post<IContactsState>(`${this.url}/contacts`, {
      id: userId,
    });
  }

  editProfileSettings(formData: IProfileData): Observable<IServerResponse> {
    return this.http.patch<IServerResponse>(`${this.url}/me`, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
