import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { IMessage } from '../dialog/dialog';
import { ConnectEvent } from './event';

const SERVER_URL = 'http://localhost:3001';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;

  public initSocket(): void {
    this.socket = socketIo.io(SERVER_URL);
  }

  public send(message: IMessage): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<IMessage> {
    return new Observable<IMessage>((observer) => {
      this.socket.on('message', (data: IMessage) => observer.next(data));
    });
  }

  public onEvent(event: ConnectEvent): Observable<any> {
    return new Observable<Event>((observer) => {
      this.socket.on(event, () => observer.next());
    });
  }
}
