import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGroup } from './group';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private apiUrl = 'http://www.wbschool-chat.ru';

  constructor(private http: HttpClient) {}

  getGroupChats(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(`${this.apiUrl}/chats/groups`);
  }

  getPrivateChats(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(`${this.apiUrl}/chats`);
  }

  createGroupChat(group: IGroup): Observable<IGroup> {
    return this.http.post<IGroup>(`${this.apiUrl}/chats`, group);
  }
}
