import { Component, OnInit } from '@angular/core';

import { IFriend } from './friend';
import { Router } from '@angular/router';
import { ActiveChatService } from '../active-chat.service';
import { GroupsService } from '../groups/groups.service';
import { Observable } from 'rxjs/internal/Observable';
import {
  selectFriends,
  selectGroups,
} from '../store/selectors/groups.selectors';
import { IGroupsState } from '../store/reducers/groups.reducers';
import { select, Store } from '@ngrx/store';
import { changeChatGroup, loadFriends } from '../store/actions/groups.actions';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  public friendsState$: Observable<IFriend[]> = this.store$.pipe(
    select(selectFriends)
  );

  friendList: IFriend[] = [];

  constructor(
    private router: Router,
    private activeChat: ActiveChatService,
    private chatListService: GroupsService,
    private store$: Store<IGroupsState>
  ) {}

  ngOnInit(): void {
    this.getChats();
    this.friendsState$.subscribe((res) => {
      console.log(res);
    });
  }

  getChats() {
    this.store$.dispatch(loadFriends());
  }

  goToChat(chatId: string) {
    this.store$.dispatch(changeChatGroup({ chatGroup: chatId }));
    localStorage.setItem('chatID', chatId);

    this.router.navigateByUrl('/chat');
  }

  getFriend(data: IFriend) {
    return data.users[0] === data.owner ? data.users[0] : data.users[1];
  }

  createPrivateChat() {}
}
