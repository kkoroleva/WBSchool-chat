import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveChatService } from '../active-chat.service';
import { GroupsService } from '../groups/groups.service';
import { IUnread } from './unread';

@Component({
  selector: 'app-unread',
  templateUrl: './unread.component.html',
  styleUrls: ['./unread.component.scss']
})
export class UnreadsComponent implements OnInit {

  unreadList: IUnread[] = [];

  constructor(
    private router: Router,
    private activeChat: ActiveChatService,
    private httpService: GroupsService
  ) { }

  ngOnInit(): void {
    this.httpService.getAllChats().subscribe((res) => {
      res.forEach(el => {
        if (!el.isRead) {
          this.unreadList.push(el);
        }
      });
    });
  }

  goToChat(chatId: string): void {
    this.activeChat.activeChatSubject.next(chatId);
    this.router.navigateByUrl('/chat');
  }

}




