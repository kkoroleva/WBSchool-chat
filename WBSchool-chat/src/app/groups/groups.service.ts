import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGroup } from './group';
import { IUser } from './user';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private apiUrl = 'http://www.wbschool-chat.ru';

  constructor(private http: HttpClient) {}

  getGroupChats(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(`${this.apiUrl}/chats`);
  }

  createGroupChat(
    name: string,
    users: IUser[],
    about: string
  ): Observable<IGroup> {
    return this.http.post<IGroup>(`${this.apiUrl}/chats`, {
      name,
      users,
      about,
    });
  }
}
