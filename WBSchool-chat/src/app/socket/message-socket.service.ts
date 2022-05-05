import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMessage } from '../../interfaces/dialog-interface';
import {
  allChatsMessages,
  deleteMessage,
  editMessage,
  getAllChatsMessages,
  pushToMessages,
} from '../store/actions/dialog.action';
import { allGroupsMessages } from '../store/actions/groups.actions';
import { SocketService } from './socket.service';

export interface IDeleteMessage {
  messageId: string;
  chatId: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessageSocketService {
  constructor(private socketService: SocketService, private store$: Store) {}

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

  public initIoConnectionMessages() {
    this.onMessage().subscribe((message: IMessage) => {
      this.store$.dispatch(pushToMessages({ message }));
      this.store$.dispatch(
        allGroupsMessages({
          chatId: message.chatId!,
          lastMessage: message.text,
          messageId: message._id!,
        })
      );
      this.store$.dispatch(
        allChatsMessages({ chatId: message.chatId!, lastMessage: message.text })
      );
    });

    this.onDeleteMessage().subscribe((message: IDeleteMessage) => {
      this.store$.dispatch(deleteMessage({ id: message.messageId }));
      this.store$.dispatch(getAllChatsMessages({ chatId: message.chatId }));
    });
    
    this.onUpdateMessage().subscribe((message: IMessage) => {
      this.store$.dispatch(editMessage({ message }));
      this.store$.dispatch(
        allGroupsMessages({
          chatId: message.chatId!,
          lastMessage: message.text,
          messageId: message._id!,
        })
      );
      this.store$.dispatch(getAllChatsMessages({ chatId: message.chatId! }));
    });
  }
}
