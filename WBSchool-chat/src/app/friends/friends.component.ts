import { Component, OnInit } from '@angular/core';

import { IFriend } from './friend';
import { Router } from '@angular/router';
import { ActiveChatService } from '../active-chat.service';
import { GroupsService } from '../groups/groups.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  friendList: IFriend[] = [];

  constructor(
    private router: Router,
    private activeChat: ActiveChatService,
    private chatListService: GroupsService) {
    //this.friendList = mockFriends;
  }

  ngOnInit(): void {
    this.chatListService.getPrivateChats().subscribe((res) => {
      this.friendList = res;
    });
  }

  goToChat(chatId: string) {
    this.activeChat.activeChatSubject.next(chatId);
    this.router.navigateByUrl('/chat');
  }

  getFriend(data: IFriend) {
    return (data.users[0] === data.owner)? data.users[0] : data.users[1];
  }

}
