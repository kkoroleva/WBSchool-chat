import { Component } from '@angular/core';

import { Friend } from './friend';
import { Router } from '@angular/router';
import { ActiveChatService } from '../active-chat.service';

const mockFriends: Friend[] = [
  {
    chatId: 'dfghjkl;kjhgfdfghjkl',
    isActive: true,
    thumbnail: "https://i.ibb.co/vdcywBn/female.jpg",
    name: "Karina",
    lastActive: "today, 7:55AM",
    lastMessage: "Let's build an app?!"
  },
  {
    chatId: 'dfghjkl;kjhgfdfghjkl',
    isActive: false,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Sasha",
    lastActive: "today, 8:01AM",
    lastMessage: "No probs. Give me more. Details."
  },
  {
    chatId: 'dfghjkl;kjhgfdfghjkl',
    isActive: true,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Lenya",
    lastActive: "today, 8:30AM",
    lastMessage: "Sounds fun."
  },
  {
    chatId: 'dfghjkl;kjhgfdfghjkl',
    isActive: true,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Nikita",
    lastActive: "today, 8:40",
    lastMessage: "Count me in!"
  },
  {
    chatId: 'dfghjkl;kjhgfdfghjkl',
    isActive: false,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Dima",
    lastActive: "today, ...",
    lastMessage: "..."
  },
  {
    chatId: 'dfghjkl;kjhgfdfghjkl',
    isActive: true,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Pasha",
    lastActive: "today, 10:00AM",
    lastMessage: "I'll try!"
  },
  {
    chatId: 'dfghjkl;kjhgfdfghjkl',
    isActive: false,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Sergey",
    lastActive: "today, 12:00PM",
    lastMessage: "Love the idea"
  },
  {
    chatId: 'dfghjkl;kjhgfdfghjkl',
    isActive: true,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Karina",
    lastActive: "yesterday",
    lastMessage: "Let's build an app?!"
  },
  {
    chatId: 'dfghjkl;kjhgfdfghjkl',
    isActive: true,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Karina",
    lastActive: "2 days before",
    lastMessage: "Let's build an app?!"
  }
];

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {

  friendList: Friend[];

  constructor(private router: Router, private activeChat: ActiveChatService) {
    this.friendList = mockFriends;
  }

  goToChat(chatId: string) {
    this.activeChat.activeChatSubject.next(chatId);
    this.router.navigateByUrl('/chat');
  }

}
