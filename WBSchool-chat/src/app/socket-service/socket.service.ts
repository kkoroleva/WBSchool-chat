import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import {IMessage} from "../dialog/dialog";
import {Observable} from "rxjs";
import {Event} from "./event";

const SERVER_URL = 'http://localhost:3001';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any; // Или напиши интерфейс сам, у меня не вышло

  public initSocket(): void {
    this.socket = socketIo.io(SERVER_URL);
  }

  public send(message: IMessage) {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<IMessage> {
    return new Observable<IMessage>(observer => {
      this.socket.on('message', (data: IMessage) => observer.next(data))
    })
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    })
  }
}
