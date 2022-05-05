import { Component, Input, OnInit } from '@angular/core';
import { IPrivate } from './private';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { selectFriends } from '../store/selectors/groups.selectors';
import { IGroupsState } from '../store/reducers/groups.reducers';
import { select, Store } from '@ngrx/store';
import {
  changeChatGroup,
  loadFriends,
  outFromChatFriend,
} from '../store/actions/groups.actions';
import { MatDialog } from '@angular/material/dialog';
import { CreatePrivateChatComponent } from './create-private-chat/create-private-chat.component';
import { selectUser } from '../store/selectors/auth.selectors';
import { IUserData } from '../auth/interfaces';
import {
  allChatsMessages,
  getAllChatsMessages,
} from '../store/actions/dialog.action';
import { IAllMessages } from '../store/reducers/dialog.reducer';
import {
  IDeleteMessage,
  MessageSocketService,
} from '../socket/message-socket.service';
import { selectAllChatsMessages } from '../store/selectors/dialog.selector';
import { IMessage } from '../dialog/dialog';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit {



  public friendsState$: Observable<IPrivate[]> = this.store$.pipe(
    select(selectFriends)
  );

  public user$: Observable<IUserData> = this.store$.pipe(select(selectUser));

  public allLastMessages$: Observable<IAllMessages[]> = this.store$.pipe(
    select(selectAllChatsMessages)
  );

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store$: Store<IGroupsState>,
    private messageSocketService: MessageSocketService
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(loadFriends());
    let chatsLength: number | undefined = 0;
    this.store$.pipe(select(selectAllChatsMessages)).subscribe((messages) => {
      chatsLength = messages.length;
    });
    this.friendsState$.subscribe((chats: IPrivate[]) => {
      // console.log(chats)
      if (chatsLength === 0) {
        chats.forEach((chat: IPrivate) => {
          this.store$.dispatch(getAllChatsMessages({ chatId: chat._id! }));
        });
      }
    });
  }

  goToChat(chatId: string): void {
    this.store$.dispatch(changeChatGroup({ chatGroup: chatId }));
    localStorage.setItem('chatID', chatId);
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

  outFromChat(_id: string, owner: string) {
    let result = confirm('Вы точно хотите выйти из чата?');
    if (!!result) {
      this.store$.dispatch(outFromChatFriend({ chatId: _id, owner: owner }));
      setTimeout(() => {
        this.store$.dispatch(loadFriends());
      }, 200)
    }
  }
}
