import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage, User } from './dialog';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private urlApi:string = "https://wbschool-chat.ru/api";

  getMe():Observable<User>{
    return this.http.get<User>(`${this.urlApi}/users/me`)
  }
  constructor(private http: HttpClient) { };
  
  getMessages(id: string):Observable<IMessage[]>{
    return this.http.get<IMessage[]>(`${this.urlApi}/chats/${id}/messages`)
  };

  sendMessage(text: string, id: string, imageOrFile?: string, formatImage?: string):Observable<IMessage>{
    const message = {
      text: text,
      imageOrFile: imageOrFile,
      formatImage: formatImage
    }
    if (imageOrFile && formatImage && text) {
      return this.http.post<IMessage>(`${this.urlApi}/chats/${id}/messages`, message)
    }
      return this.http.post<IMessage>(`${this.urlApi}/chats/${id}/messages`, {text})
  };

  deleteMessage(id: string, idChat: string):Observable<IMessage>{
    return this.http.delete<IMessage>(`${this.urlApi}/chats/${idChat}/messages/${id}`)
  };
  editMessage(text: string, id: string, idChat: string):Observable<IMessage>{
    return this.http.patch<IMessage>(`${this.urlApi}/chats/${idChat}/messages/${id}`, {text})
  };
}