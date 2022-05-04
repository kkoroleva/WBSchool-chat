import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage, User } from './dialog';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private http: HttpClient,
    @Inject('API_URL') readonly apiUrl: string
  ) {}

  getMyInfo(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/users/me`);
  }

  editMessage(
    editedMessage: string,
    id: string | undefined,
    idChat: string | undefined
  ): Observable<IMessage> {
    return this.http.patch<IMessage>(
      `${this.apiUrl}/api/chats/${idChat}/messages/${id}`,
      { text: editedMessage }
    );
  }
}
