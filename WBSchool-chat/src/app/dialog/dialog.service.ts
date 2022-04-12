import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage } from './dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private urlApi:string = "http://www.wbschool-chat.ru" ;
  
  constructor(private http:HttpClient) {
    console.log(this.urlApi, "this")
  };
  
  getMessages():Observable<IMessage[]>{///================получение ответа из апи
    return this.http.get<IMessage[]>(`${this.urlApi}/messages`)
  };


  sendMessage(text:string):Observable<IMessage>{
    return this.http.post<IMessage>(`${this.urlApi}/messages`, {text})
  };


  deleteMessage(id:string):Observable<IMessage>{
    return this.http.delete<IMessage>(`${this.urlApi}/messages/${id}`)
  };

  
  editMessage(text:string, id:string):Observable<IMessage>{
    return this.http.patch<IMessage>(`${this.urlApi}/messages/${id}`, {text})
  };
}
