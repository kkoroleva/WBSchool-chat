import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  pushToNotification,
  removeNotification,
  clearNotifications,
} from '../store/actions/notifications.actions';
import { INotification } from '../store/reducers/notifications.reducers';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService {
  constructor(private socketService: SocketService, private store$: Store) {}

  public createNotification(notification: INotification): void {
    this.socketService.socket.emit('notifications:create', { notification });
  }

  public createGroupNotification(
    notification: INotification,
    chatId: string,
    usersId: string[]
  ): void {
    console.log('Emit notification', notification, chatId, usersId);
    this.socketService.socket.emit('notifications:addNotification', {
      notification,
      chatId,
      usersId,
    });
  }

  public deleteNotification(notificationId: string) {
    this.socketService.socket.emit('notifications:delete', { notificationId });
  }

  public clearNotifications() {
    this.socketService.socket.emit('notifications:clear');
  }

  public onCreateNotification(): Observable<INotification> {
    return new Observable<INotification>((observer) => {
      this.socketService.socket.on(
        'notifications:create',
        (notification: INotification) => {
          console.log('Create notification', notification);
          observer.next(notification);
        }
      );
    });
  }

  public onAddInGroup(): Observable<INotification> {
    return new Observable<INotification>((observer) => {
      this.socketService.socket.on(
        'notifications:addInGroup',
        (notification: INotification) => {
          console.log('AddInGroup notification', notification);
          observer.next(notification);
        }
      );
    });
  }

  public onDeleteNotification(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socketService.socket.on(
        'notifications:delete',
        (notificationId: string) => {
          console.log('delete notification', notificationId);
          observer.next(notificationId);
        }
      );
    });
  }

  public onClearNotifications(): Observable<INotification[]> {
    return new Observable<INotification[]>((observer) => {
      this.socketService.socket.on(
        'notifications:clear',
        (notifications: INotification[]) => {
          console.log('Clear notifications', notifications);
          observer.next(notifications);
        }
      );
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
      this.store$.dispatch(clearNotifications());
    });
    this.onAddInGroup().subscribe((notification: INotification) => {
      this.store$.dispatch(pushToNotification({ notification }));
    });
  }

  public offNotifications() {
    this.socketService.socket.off('notifications:clear');
    this.socketService.socket.off('notifications:delete');
    this.socketService.socket.off('notifications:create');
    this.socketService.socket.off('notifications:addInGroup');
  }
}
