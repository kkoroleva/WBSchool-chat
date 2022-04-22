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
    this.socket = socketIo.io(this.apiUrl);
  }

  public send(message: IMessage): void {
    this.socket.emit(message);
  }

  public onMessage(): Observable<IMessage> {
    return new Observable<IMessage>(observer => {
      this.socket.on('message', (data: IMessage) => {
        console.log('Server message', data);
        observer.next(data)
      });
    });
  }

  public onEvent(event: ConnectEvent): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
