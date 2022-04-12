import { Component } from '@angular/core';

import { Friend } from './friend';

const mockFriends: Friend[] = [
  {
    isActive: true,
    thumbnail: "https://i.ibb.co/vdcywBn/female.jpg",
    name: "Karina",
    lastActive: "today, 7:55AM",
    lastMessage: "Let's build an app?!"
  },
  {
    isActive: false,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Sasha",
    lastActive: "today, 8:01AM",
    lastMessage: "No probs. Give me more. Details."
  },
  {
    isActive: true,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Lenya",
    lastActive: "today, 8:30AM",
    lastMessage: "Sounds fun."
  },
  {
    isActive: true,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Nikita",
    lastActive: "today, 8:40",
    lastMessage: "Count me in!"
  },
  {
    isActive: false,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Dima",
    lastActive: "today, ...",
    lastMessage: "..."
  },
  {
    isActive: true,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Pasha",
    lastActive: "today, 10:00AM",
    lastMessage: "I'll try!"
  },
  {
    isActive: false,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Sergey",
    lastActive: "today, 12:00PM",
    lastMessage: "Love the idea"
  },
  {
    isActive: true,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Karina",
    lastActive: "yesterday",
    lastMessage: "Let's build an app?!"
  },
  {
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

  constructor() {
    this.friendList = mockFriends;
  }

}
