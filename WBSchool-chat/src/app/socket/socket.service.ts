import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as socketIo from 'socket.io-client';
import {IMessage} from '../dialog/dialog';
import {ConnectEvent} from './event';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  constructor(@Inject('API_URL') readonly apiUrl: string) {
  }

  public initSocket(): void {
    this.socket = socketIo.io(this.apiUrl, {
      path: '/api/socket'
    });
  }

  public send(message: IMessage): void {
    this.socket.emit('message', message);
  }

  public deleteMessage(id: string): void {
    this.socket.emit('messages:delete', id);
  }

  public onMessage(): Observable<IMessage> {
    return new Observable<IMessage>(observer => {
      this.socket.on('message', (message: IMessage) => {
        console.log('Server message', message);
        observer.next(message)
      });
    });
  }

  public onDeleteMessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('messages:delete', (messageId: string) => {
        console.log('Deleted message id', messageId);
        observer.next(messageId);
      })
    })
  }

  public onUpdateMessage(): Observable<IMessage> {
    return new Observable<IMessage>(observer => {
      this.socket.on('update message', (message: IMessage) => {
        console.log('Update message', message);
        observer.next(message);
      })
    })
  }

  public onEvent(event: ConnectEvent): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
