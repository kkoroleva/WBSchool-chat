import { GroupsService } from './groups.service';
import { Component, OnInit } from '@angular/core';
import { IGroup } from './group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  groups: IGroup[] = [
    {
      title: 'Friends Reunion',
      lastMessage: 'Hi Guys, Wassup!',
      image: '/assets/images/img.svg',
    },
    {
      title: 'Friends Forever',
      lastMessage: 'Good to see you.',
      image: '/assets/images/img2.svg',
    },
    {
      title: 'Crazy Cousins',
      lastMessage: 'What plans today?',
      image: '/assets/images/img3.svg',
    },
  ];

  constructor(private groupsService: GroupsService) {}

  ngOnInit(): void {}

  getChats(): void {
    this.groupsService.getChats().subscribe((chats) => (this.groups = chats));
  }
}
