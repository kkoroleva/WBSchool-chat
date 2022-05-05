import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage } from '../../interfaces/dialog-interface';
import { SocketService } from './socket.service';

export interface IDeleteMessage {
  messageId: string;
  chatId: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessageSocketService {
  constructor(private socketService: SocketService) {}

  public send(chatId: string, message: IMessage): void {
    this.socketService.socket.emit('messages:create', { chatId, message });
  }

  public deleteMessage(chatId: string, messageId: string): void {
    this.socketService.socket.emit(`messages:delete`, { chatId, messageId });
  }

  public updateMessage(chatId: string, message: IMessage): void {
    this.socketService.socket.emit('messages:update', { chatId, message });
  }

  public onMessage(): Observable<IMessage> {
    return new Observable<IMessage>((observer) => {
      this.socketService.socket.on('messages:create', (message: IMessage) => {
        console.log('Server message', message);
        observer.next(message);
      });
    });
  }

  public onDeleteMessage(): Observable<IDeleteMessage> {
    return new Observable<IDeleteMessage>((observer) => {
      this.socketService.socket.on(
        `messages:delete`,
        (message: IDeleteMessage) => {
          console.log('Deleted message id', message);
          observer.next(message);
        }
      );
    });
  }

  public onUpdateMessage(): Observable<IMessage> {
    return new Observable<IMessage>((observer) => {
      this.socketService.socket.on('messages:update', (message: IMessage) => {
        console.log('Update message', message);
        observer.next(message);
      });
    });
  }

  public offMessages() {
    this.socketService.socket.off('messages:create');
    this.socketService.socket.off('messages:update');
    this.socketService.socket.off('messages:delete');
  }
}
