import { INotification } from './../store/reducers/notifications.reducers';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { IMessage } from '../dialog/dialog';
import { ConnectEvent } from './event';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import {
  changeLoadNotifications,
  loadNotifications,
  pushToNotification,
  removeNotification,
} from '../store/actions/notifications.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;
  constructor(
    @Inject('API_URL') readonly apiUrl: string,
    private auth: AuthService,
    private router: Router,
    private store$: Store
  ) {}

  public initSocket(): void {
    if (localStorage.getItem('token')) {
      this.socket = socketIo.io(this.apiUrl, {
        path: '/api/socket',
        auth: { token: localStorage.getItem('token') },
      });
    } else if (!localStorage.getItem('token')) {
      this.auth.logout();
      this.socket.offAny();
      this.router.navigateByUrl('/auth/login');
    }
  }

  public createNotification(notification: INotification): void {
    this.socket.emit('notifications:create', { notification });
  }

  public createGroupNotification(
    notification: INotification,
    chatId: string,
    userId: string
  ): void {
    this.socket.emit('notifications:addNotification', {
      notification,
      chatId,
      userId,
    });
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

  public onDeleteMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on(`messages:delete`, (messageId: string) => {
        console.log('Deleted message id', messageId);
        observer.next(messageId);
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

  public disconnect(): void {
    this.socket.offAny();
    console.log('Работает');
  }

  public onEvent(event: ConnectEvent): Observable<any> {
    return new Observable<Event>((observer) => {
      this.socket.on(event, () => observer.next());
    });
  }

  public initIoConnectionNotification(): void {
    this.onCreateNotification().subscribe((notification: INotification) => {
      this.store$.dispatch(pushToNotification({ notification }));
    });
    this.onDeleteNotification().subscribe((notificationId: string) => {
      this.store$.dispatch(removeNotification({ id: notificationId }));
    });
    this.onClearNotifications().subscribe((notifications: INotification[]) => {
      this.store$.dispatch(changeLoadNotifications({ notifications }));
    });
  }

  public offMessages() {
    this.socket.off('messages:create');
    this.socket.off('messages:update');
    this.socket.off('messages:delete');
  }

  public offNotifications() {
    this.socket.off('notifications:clear');
    this.socket.off('notifications:delete');
    this.socket.off('notifications:create');
  }
}
