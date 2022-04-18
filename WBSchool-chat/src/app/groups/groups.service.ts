import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGroup } from './group';
import { IFriend } from '../friends/friend';
import { IUnread } from '../unread/unread';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private apiUrl = 'https://wbschool-chat.ru/api';

  constructor(private http: HttpClient) {}

  // getGroupChats(): Observable<IGroup[]> {
  //   return this.http.get<IGroup[]>(`${this.apiUrl}/chats/groups`);
  // }

  getPrivateChats(): Observable<IFriend[]> {
    return this.http.get<IFriend[]>(`${this.apiUrl}/chats/friends`);
  }

  getAllChats(): Observable<IUnread[]> {
    return this.http.get<IUnread[]>(`${this.apiUrl}/chats`);
  }

  createGroupChat(group: IGroup): Observable<IGroup> {
    return this.http.post<IGroup>(`${this.apiUrl}/chats`, group);
  }

  createPrivateChat(chat: IFriend): Observable<IFriend> {
    return this.http.post<IFriend>(`${this.apiUrl}/chats`, chat);
  }

  markEveryChatUnread(chats: IUnread[]): Observable<IUnread> {
    return this.http.patch<IUnread>(`${this.apiUrl}/chats`, chats);
  }
}
