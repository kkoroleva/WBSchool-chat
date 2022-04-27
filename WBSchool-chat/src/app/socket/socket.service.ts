import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { IMessage } from '../dialog/dialog';
import { ConnectEvent } from './event';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;
  constructor(@Inject('API_URL') readonly apiUrl: string) {}

  public initSocket(): void {
    if (localStorage.getItem('token')) {
      this.socket = socketIo.io(this.apiUrl, {
        path: '/api/socket',
        auth: {token: localStorage.getItem('token')}
      })
    }
  }

  public send(chatId: string, message: IMessage): void {
    this.socket.emit('messages:create', {chatId, message});
  }

  public deleteMessage(chatId: string, messageId: string): void {
    console.log(this.socket);
    this.socket.emit(`messages:delete`, {chatId, messageId});
  }

  public updateMessage(chatId: string, message: IMessage): void {
    this.socket.emit('messages:update', {chatId, message})
  }

  public onMessage(): Observable<IMessage> {
    return new Observable<IMessage>(observer => {
      this.socket.on('messages:create', (message: IMessage) => {
        console.log('Server message', message);
        observer.next(message);
      });
    });
  }

  public onDeleteMessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on(`messages:delete`, (messageId: string) => {
        console.log('Deleted message id', messageId);
        observer.next(messageId);
      });
    });
  }

  public onUpdateMessage(): Observable<IMessage> {
    return new Observable<IMessage>(observer => {
      this.socket.on('messages:update', (message: IMessage) => {
        console.log('Update message', message);
        observer.next(message);
      });
    });
  }

  public onEvent(event: ConnectEvent): Observable<any> {
    return new Observable<Event>((observer) => {
      this.socket.on(event, () => observer.next());
    });
  }
}
