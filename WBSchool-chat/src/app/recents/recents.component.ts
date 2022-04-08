import { Component, OnInit } from '@angular/core';
import { Recent } from './recent';

const mockRecents: Recent[] = [
  {
    isRead: true,
    isActive: false,
    newMessages: 0,
    thumbnail: "https://i.ibb.co/vdcywBn/female.jpg",
    name: "Karina",
    lastActive: "today, 7:55AM",
    lastMessage: "Let's build an app?!"
  },
  {
    isRead: true,
    isActive: false,
    newMessages: 0,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Sasha",
    lastActive: "today, 8:01AM",
    lastMessage: "No probs. Give me more. Details."
  },
  {
    isRead: true,
    isActive: false,
    newMessages: 0,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Lenya",
    lastActive: "today, 8:30AM",
    lastMessage: "Sounds fun."
  },
  {
    isRead: true,
    isActive: false,
    newMessages: 0,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Nikita",
    lastActive: "today, 8:40",
    lastMessage: "Count me in!"
  },
  {
    isRead: true,
    isActive: false,
    newMessages: 0,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Dima",
    lastActive: "today, ...",
    lastMessage: "..."
  },
  {
    isRead: true,
    isActive: false,
    newMessages: 0,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Pasha",
    lastActive: "today, 10:00AM",
    lastMessage: "I'll try!"
  },
  {
    isRead: true,
    isActive: false,
    newMessages: 0,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Sergey",
    lastActive: "today, 12:00PM",
    lastMessage: "Love the idea"
  },
  {
    isRead: true,
    isActive: false,
    newMessages: 0,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Karina",
    lastActive: "yesterday",
    lastMessage: "Let's build an app?!"
  },
  {
    isRead: true,
    isActive: false,
    newMessages: 0,
    thumbnail: "https://i.ibb.co/3p37FtX/male.png",
    name: "Karina",
    lastActive: "2 days before",
    lastMessage: "Let's build an app?!"
  }
];

@Component({
  selector: 'app-recents',
  templateUrl: './recents.component.html',
  styleUrls: ['./recents.component.scss']
})
export class RecentsComponent implements OnInit {

  recentList: Recent[] = mockRecents;

  constructor() { }

  ngOnInit(): void {
  }

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  isNewMessages(newmessages: number | null) : boolean {
    return (newmessages === 0 || !newmessages)? false : true;
  }
}




