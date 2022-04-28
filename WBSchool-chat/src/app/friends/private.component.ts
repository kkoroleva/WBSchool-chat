import { Component, OnDestroy, OnInit} from '@angular/core';
import { IPrivate } from './private';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { selectFriends } from '../store/selectors/groups.selectors';
import { IGroupsState } from '../store/reducers/groups.reducers';
import { select, Store } from '@ngrx/store';
import {
  changeChatGroup,
  deleteChatFriend,
  loadFriends,
} from '../store/actions/groups.actions';
import { MatDialog } from '@angular/material/dialog';
import { CreatePrivateChatComponent } from './create-private-chat/create-private-chat.component';
import { selectUser } from '../store/selectors/auth.selectors';
import { IUserData } from '../auth/interfaces';
import { getAllChatsMessages, pushAllChatsMessages } from '../store/actions/dialog.action';
import { IAllMessages } from '../store/reducers/dialog.reducer';
import { selectAllChatsMessages } from '../store/selectors/dialog.selector';
import { SocketService } from '../socket/socket.service';
import { IMessage } from '../dialog/dialog';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit {
  public friendsState$: Observable<IPrivate[]> = this.store$.pipe(
    select(selectFriends)
  );

  public user$: Observable<IUserData> = this.store$.pipe(
    select(selectUser)
  );

  public allLastMessages$: Observable<IAllMessages[]> = this.store$.pipe(
    select(selectAllChatsMessages)
  );

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store$: Store<IGroupsState>,
    private socketService: SocketService,
    private storage: StorageMap
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(loadFriends());
    let chats: number | undefined = 0;
    this.store$.pipe(select(selectAllChatsMessages)).subscribe((messages) => {
      chats = messages.length;
    })
    console.log(chats)
    if (chats === 0) {
      this.store$.pipe(select(selectFriends)).subscribe((chats: IPrivate[]) => {
        chats.forEach((chat: IPrivate) => {
          this.store$.dispatch(getAllChatsMessages({chatId: chat._id!}));
        })
    })
    }
    this.getLastMessages();
  }

  getLastMessages() {
    this.socketService.onMessage().subscribe((message: IMessage) => {
          this.store$.dispatch(pushAllChatsMessages({chatId: message._id!, lastMessage: message.text}));
          this.store$.dispatch(loadFriends());
    });
  }

  goToChat(chatId: string): void {
    this.store$.dispatch(changeChatGroup({ chatGroup: chatId }));
    localStorage.setItem('chatID', chatId)
      this.router.navigateByUrl('/chat');
  }

  getFriend(data: IPrivate): string {
    return data.users[0] === data.owner ? data.users[0] : data.users[1];
  }

  createPrivateChat(): void {
    this.dialog.open(CreatePrivateChatComponent, {
      panelClass: 'create-private-chat-modal',
      maxWidth: '100vw',
    });
  }

  deleteChat(_id: string) {
    this.store$.dispatch(deleteChatFriend({ chatId: _id }));
    this.store$.dispatch(loadFriends());
  }
}
