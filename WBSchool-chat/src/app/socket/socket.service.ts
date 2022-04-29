import { Store } from '@ngrx/store';
import {
  INotification,
  INotificationsState,
} from './../store/reducers/notifications.reducers';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { IDeleteMessage, IMessage } from '../dialog/dialog';
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
        auth: { token: localStorage.getItem('token') },
      });
    }
  }

  public createNotification(notification: INotification): void {
    this.socket.emit('notifications:create', { notification });
  }

  public deleteNotification(notificationId: string) {
    this.socket.emit('notifications:delete', { notificationId });
  }

  public clearNotifications() {
    this.socket.emit('notifications:clear');
  }

  public onCreateNotification(): Observable<INotification> {
    return new Observable<INotification>((observer) => {
      this.socket.on('notifications:create', (notification: INotification) => {
        console.log('Create notification', notification);
        observer.next(notification);
      });
    });
  }

  public onDeleteNotification(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('notifications:delete', (notificationId: string) => {
        console.log('delete notification', notificationId);
        observer.next(notificationId);
      });
    });
  }

  public onClearNotifications(): Observable<INotification[]> {
    return new Observable<INotification[]>((observer) => {
      this.socket.on(
        'notifications:clear',
        (notifications: INotification[]) => {
          console.log('Clear notifications', notifications);
          observer.next(notifications);
        }
      );
    });
  }

  public send(chatId: string, message: IMessage): void {
    this.socket.emit('messages:create', { chatId, message });
  }

  public deleteMessage(chatId: string, messageId: string): void {
    console.log(this.socket);
    this.socket.emit(`messages:delete`, { chatId, messageId });
  }

  public updateMessage(chatId: string, message: IMessage): void {
    this.socket.emit('messages:update', { chatId, message });
  }

  public onMessage(): Observable<IMessage> {
    return new Observable<IMessage>((observer) => {
      this.socket.on('messages:create', (message: IMessage) => {
        console.log('Server message', message);
        observer.next(message);
      });
    });
  }

  public onDeleteMessage(): Observable<IDeleteMessage> {
    return new Observable<IDeleteMessage>((observer) => {
      this.socket.on(`messages:delete`, (message: IDeleteMessage) => {
        console.log('Deleted message id', message);
        observer.next(message);
      });
    });
  }

  public onUpdateMessage(): Observable<IMessage> {
    return new Observable<IMessage>((observer) => {
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

  public offMessages() {
    this.socket.off('messages:create');
    this.socket.off('messages:update');
    this.socket.off('messages:delete');
  }
}
