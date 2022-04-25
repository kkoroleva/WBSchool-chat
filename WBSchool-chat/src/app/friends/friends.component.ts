import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IFriend } from './friend';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { selectFriends } from '../store/selectors/groups.selectors';
import { IGroupsState } from '../store/reducers/groups.reducers';
import { select, Store } from '@ngrx/store';
import { changeChatGroup, deleteChatFriend, loadFriends, updateChatFriends } from '../store/actions/groups.actions';
import { MatDialog } from '@angular/material/dialog';
import { CreatePrivateChatComponent } from './create-private-chat/create-private-chat.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit, OnChanges, DoCheck {
  public friendsState$: Observable<IFriend[]> = this.store$.pipe(
    select(selectFriends)
  );

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store$: Store<IGroupsState>
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(loadFriends());
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.store$.dispatch(loadFriends());
  }

  ngDoCheck(): void {
    // this.store$.dispatch(loadFriends());
  }

  updateChats(_id: string): void {
    this.store$.dispatch(updateChatFriends({chatId: _id}))
  }

  goToChat(chatId: string): void {
    this.store$.dispatch(changeChatGroup({ chatGroup: chatId }));
    localStorage.setItem('chatID', chatId);
    this.router.navigateByUrl('/chat');
  }

  getFriend(data: IFriend): string {
    return data.users[0] === data.owner ? data.users[0] : data.users[1];
  }

  createPrivateChat(): void {
    this.dialog.open(CreatePrivateChatComponent, {
      panelClass: 'create-private-chat-modal',
      maxWidth: '100vw',
    });
  }

  deleteChat(_id: string) {
    this.store$.dispatch(deleteChatFriend({chatId: _id}));
    // this.updateChats(_id);
  }
}
