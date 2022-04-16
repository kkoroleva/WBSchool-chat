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
  
<<<<<<< HEAD
  getMessages(id:string):Observable<IMessage[]>{
<<<<<<< HEAD
=======
  // getMessages(id:string):Observable<IMessage[]>{
  //   const x =  this.http.get<IMessage[]>(`${this.urlApi}/chats/${id}/messages`)
  //   console.log(x, "this chats")
  //   return x 
  // };
 

  // sendMessage(text:string, id:string):Observable<IMessage>{
  //   return this.http.post<IMessage>(`${this.urlApi}/chats/${id}/messages`, {text})
  
  constructor(private http: HttpClient) { };
  
  getMessages(id: string):Observable<IMessage[]>{
>>>>>>> bae15a0e1ccf8b2e197ea916b34bb8aa71df1cab
    return this.http.get<IMessage[]>(`${this.urlApi}/chats/${id}/messages`)
=======
    const x = this.http.get<IMessage[]>(`${this.urlApi}/chats/${id}/messages`)
    console.log(x, "this chats")
    return x 
>>>>>>> d2b730f336c04427b8773527de2e421770feffd5
  };

  sendMessage(text: string, id: string, imageOrFile?: string, formatImage?: string):Observable<IMessage>{
    if (imageOrFile && formatImage && text) {
      return this.http.post<IMessage>(`${this.urlApi}/chats/${id}/messages`, {text, imageOrFile, formatImage})
    }
    else if (imageOrFile && formatImage && !text){
      return this.http.post<IMessage>(`${this.urlApi}/chats/${id}/messages`, {imageOrFile, formatImage})
    }
    else {
      return this.http.post<IMessage>(`${this.urlApi}/chats/${id}/messages`, {text})
    }
  };

<<<<<<< HEAD

  deleteMessage(id: string, idChat: string):Observable<IMessage>{
=======
  deleteMessage(id:string, idChat:string):Observable<IMessage>{
>>>>>>> d2b730f336c04427b8773527de2e421770feffd5
    return this.http.delete<IMessage>(`${this.urlApi}/chats/${idChat}/messages/${id}`)
  };

  
  editMessage(text: string, id: string, idChat: string):Observable<IMessage>{
    return this.http.patch<IMessage>(`${this.urlApi}/chats/${idChat}/messages/${id}`, {text})
  };
}
