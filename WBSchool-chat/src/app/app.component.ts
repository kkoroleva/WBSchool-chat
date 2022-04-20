import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initAuth } from './store/actions/auth.actions';
import { IAuthState } from './store/reducers/auth.reducers';
import { StorageMap } from '@ngx-pwa/local-storage';

import { SocketService} from "./socket-service/socket.service";
import {Action} from "./socket-service/action";
import {IMessage} from "./dialog/dialog";
import {Event} from './socket-service/event'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  eventConnection = Event;
  messages: IMessage[] = [];
  messageContent: string = '';
  ioConnection: any;

  constructor(
    private store$: Store<IAuthState>,
    private storage: StorageMap,
    private socketService: SocketService
  ){}

  ngOnInit(): void {
    this.initIoConnection();
    this.storage.get('user').subscribe((newUser: any) => {
      this.store$.dispatch(initAuth({newUser}))
      console.log(newUser)
    })
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message) => {
        this.messages.push(message);
      })

    this.socketService.onEvent(this.eventConnection.CONNECT)
      .subscribe(() => {
        console.log('connected');
      })

    this.socketService.onEvent(this.eventConnection.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected')
      })
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      text: message
    });

    this.messageContent = '';
  }
}
