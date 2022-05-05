import { NotificationSocketService } from 'src/app/socket/notification-socket.service';
import { MessageSocketService } from './socket/message-socket.service';
import { ThreadSocketService } from './socket/thread-socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { initAuth } from './store/actions/auth.actions';
import { IAuthState } from './store/reducers/auth.reducers';
import { StorageMap } from '@ngx-pwa/local-storage';
import { SocketService } from './socket/socket.service';
import { ConnectEvent } from './socket/event';
import { INotificationsState } from './store/reducers/notifications.reducers';
import { loadNotifications } from './store/actions/notifications.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private store$: Store<IAuthState | INotificationsState>,
    private storage: StorageMap,
    private socketService: SocketService,
    private threadSocketService: ThreadSocketService,
    private messageSocketService: MessageSocketService,
    private notificationSocketService: NotificationSocketService
  ) {}

  ngOnInit(): void {
    this.storage.get('user').subscribe((newUser: any) => {
      this.store$.dispatch(initAuth({ newUser }));
    });
    this.initIoConnection();
    this.store$.dispatch(loadNotifications());
  }

  private initIoConnection(): void {
    this.socketService.initSocket();
    this.socketService.onEvent(ConnectEvent.CONNECT).subscribe(() => {
      console.log('connected');
      this.messageSocketService.offMessages();
      this.notificationSocketService.offNotifications();
      this.threadSocketService.offComments();
      this.messageSocketService.initIoConnectionMessages();
      this.threadSocketService.initConnectThreads();
      this.notificationSocketService.initIoConnectionNotification();
    });
  }

  ngOnDestroy(): void {
    this.socketService.onEvent(ConnectEvent.DISCONNECT).subscribe(() => {
      console.log('disconnected');
    });
  }
}
