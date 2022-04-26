import { Component, OnInit } from '@angular/core';
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
  updateChatFriends,
} from '../store/actions/groups.actions';
import { MatDialog } from '@angular/material/dialog';
import { CreatePrivateChatComponent } from './create-private-chat/create-private-chat.component';
import { selectUser } from '../store/selectors/auth.selectors';
import { IUserData } from '../auth/interfaces';

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
  )

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store$: Store<IGroupsState>
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(loadFriends());
    // this.friendsState$.subscribe(resp => console.log(resp))
  }

  updateChats(_id: string): void {
    this.store$.dispatch(updateChatFriends({ chatId: _id }));
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
