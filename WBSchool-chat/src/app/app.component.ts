import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { initAuth } from './store/actions/auth.actions';
import { IAuthState } from './store/reducers/auth.reducers';
import { StorageMap } from '@ngx-pwa/local-storage';
import { SocketService } from './socket/socket.service';
import { ConnectEvent } from './socket/event';
import { INotificationsState } from './store/reducers/notifications.reducers';
import { loadNotifications } from './store/actions/notifications.actions';
import { loadFriends } from './store/actions/groups.actions';
import { IPrivate } from './friends/private';
import { selectFriends } from './store/selectors/groups.selectors';
import { getAllChatsMessages } from './store/actions/dialog.action';
import { selectAllChatsMessages } from './store/selectors/dialog.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private store$: Store<IAuthState | INotificationsState>,
    private storage: StorageMap,
    private socketService: SocketService
    ){}

  ngOnInit(): void {
    this.storage.get('user').subscribe((newUser: any) => {
      this.store$.dispatch(initAuth({newUser}))
    })
    this.initIoConnection();
    this.store$.dispatch(loadNotifications())
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onEvent(ConnectEvent.CONNECT)
      .subscribe(() => {
        console.log('connected');
      })
  }

  ngOnDestroy(): void {
    this.socketService.onEvent(ConnectEvent.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      })
  }
}
