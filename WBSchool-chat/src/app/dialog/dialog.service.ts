import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable, tap } from 'rxjs';
import { IMessage } from './dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private urlApi:string = "http://www.wbschool-chat.ru" ;
  
  constructor(private http:HttpClient, private sanitazer: DomSanitizer) { };
  
  getMessages():Observable<IMessage[]>{
    return this.http.get<IMessage[]>(`${this.urlApi}/chats/625555ea8ef822301dab93c8/messages`)
  };
 

  sendMessage(text: string, imageOrFile?: string, formatImage?: string):Observable<IMessage>{
    if (imageOrFile && formatImage && text) {
      return this.http.post<IMessage>(`${this.urlApi}/chats/625555ea8ef822301dab93c8/messages`, {text, imageOrFile, formatImage})
    }
    else if (imageOrFile && formatImage && !text){
      return this.http.post<IMessage>(`${this.urlApi}/chats/625555ea8ef822301dab93c8/messages`, {imageOrFile, formatImage})
    }
    else {
      return this.http.post<IMessage>(`${this.urlApi}/chats/625555ea8ef822301dab93c8/messages`, {text})
    }
  };


  deleteMessage(id:string):Observable<IMessage>{
    return this.http.delete<IMessage>(`${this.urlApi}/chats/625555ea8ef822301dab93c8/messages/${id}`)
  };

  
  editMessage(text:string, id:string):Observable<IMessage>{
    return this.http.patch<IMessage>(`${this.urlApi}/chats/625555ea8ef822301dab93c8/messages/${id}`, {text})
  };
}
