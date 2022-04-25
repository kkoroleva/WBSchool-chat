import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initAuth } from './store/actions/auth.actions';
import { IAuthState } from './store/reducers/auth.reducers';
import { StorageMap } from '@ngx-pwa/local-storage';
import { SocketService } from './socket/socket.service';
import { ConnectEvent } from './socket/event';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { INotificationsState } from './store/reducers/notifications.reducers';
import { loadNotifications } from './store/actions/notifications.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private store$: Store<IAuthState | INotificationsState>,
    private storage: StorageMap,
    private socketService: SocketService,
    private http: HttpClient){}

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
