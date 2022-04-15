import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage, User } from './dialog';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private urlApi:string = "http://www.wbschool-chat.ru";

  getMe():Observable<User>{
    return this.http.get<User>(`${this.urlApi}/users/me`)
  }
  
  // getMessages(id:string):Observable<IMessage[]>{
  //   const x =  this.http.get<IMessage[]>(`${this.urlApi}/chats/${id}/messages`)
  //   console.log(x, "this chats")
  //   return x 
  // };
 

  // sendMessage(text:string, id:string):Observable<IMessage>{
  //   return this.http.post<IMessage>(`${this.urlApi}/chats/${id}/messages`, {text})
  
  constructor(private http: HttpClient) { };
  
  getMessages(id: string):Observable<IMessage[]>{
    return this.http.get<IMessage[]>(`${this.urlApi}/chats/${id}/messages`)
  };
 

  sendMessage(text: string, id: string, imageOrFile?: string, formatImage?: string):Observable<IMessage>{
    if (imageOrFile && formatImage && text) {
      return this.http.post<IMessage>(`${this.urlApi}/chats/${id}/messages`, {text, imageOrFile, formatImage})
    }
    else if (imageOrFile && !formatImage && text){
      return this.http.post<IMessage>(`${this.urlApi}/chats/${id}/messages`, {imageOrFile, text})
    }
    else {
      return this.http.post<IMessage>(`${this.urlApi}/chats/${id}/messages`, {text})
    }
  };


  deleteMessage(id: string, idChat: string):Observable<IMessage>{
    return this.http.delete<IMessage>(`${this.urlApi}/chats/${idChat}/messages/${id}`)
  };

  
  editMessage(text: string, id: string, idChat: string):Observable<IMessage>{
    return this.http.patch<IMessage>(`${this.urlApi}/chats/${idChat}/messages/${id}`, {text})
  };
}
