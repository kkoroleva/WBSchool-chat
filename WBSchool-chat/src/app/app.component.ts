import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initAuth } from './store/actions/auth.actions';
import { IAuthState } from './store/reducers/auth.reducers';
import { StorageMap } from '@ngx-pwa/local-storage';
import { SocketService } from './socket/socket.service';
import { ConnectEvent } from './socket/event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private store$: Store<IAuthState>,
    private storage: StorageMap,
    private socketService: SocketService){}

  ngOnInit(): void {
    this.storage.get('user').subscribe((newUser: any) => {
      this.store$.dispatch(initAuth({newUser}))
      console.log(newUser)
    })
    this.initIoConnection();
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
