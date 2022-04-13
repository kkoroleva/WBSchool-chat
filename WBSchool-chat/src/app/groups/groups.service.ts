import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private apiUrl = 'http://www.wbschool-chat.ru';

  constructor(private http: HttpClient) {}

  getChats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chats`);
  }
}
