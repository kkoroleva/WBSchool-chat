import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveChatService } from '../active-chat.service';
import { Unread } from './unread';

const mockunreads: Unread[] = [
  {
    chatId: 'dfghjklkjhgfdfghjk',
    isActive: false,
    newMessages: 100,
    thumbnail: "https://i.ibb.co/vdcywBn/female.jpg",
    name: "Karina",
    lastActive: "today, 7:55AM",
    lastMessage: "Let's build an app?!"
  },
  {
    chatId: 'dfghjklkjhgfdfghjk',
    isActive: true,
    newMessages: 2,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Sasha",
    lastActive: "today, 8:01AM",
    lastMessage: "No probs. Give me more. Details."
  },
  {
    chatId: 'dfghjklkjhgfdfghjk',
    isActive: false,
    newMessages: 4,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Lenya",
    lastActive: "today, 8:30AM",
    lastMessage: "Sounds fun."
  },
  {
    chatId: 'dfghjklkjhgfdfghjk',
    isActive: true,
    newMessages: 10,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Nikita",
    lastActive: "today, 8:40",
    lastMessage: "Count me in!"
  },
  {
    chatId: 'dfghjklkjhgfdfghjk',
    isActive: false,
    newMessages: 4,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Dima",
    lastActive: "today, ...",
    lastMessage: "..."
  }
];

@Component({
  selector: 'app-unread',
  templateUrl: './unread.component.html',
  styleUrls: ['./unread.component.scss']
})
export class UnreadsComponent implements OnInit {

  unreadList: Unread[] = mockunreads;

  constructor(private router: Router, private activeChat: ActiveChatService) { }

  ngOnInit(): void {
  }

  goToChat(chatId: string): void {
    this.activeChat.activeChatSubject.next(chatId);
    this.router.navigateByUrl('/chat');
  }

}




