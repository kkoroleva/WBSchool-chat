import { ActiveChatService } from './../active-chat.service';
import { Router } from '@angular/router';
import { GroupsService } from './groups.service';
import { Component, OnInit } from '@angular/core';
import { IGroup } from './group';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupChatComponent } from './modal/create-group-chat/create-group-chat.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  groups: IGroup[] = [];

  constructor(
    private groupsService: GroupsService,
    public dialog: MatDialog,
    private router: Router,
    private activeChatService: ActiveChatService
  ) {}

  ngOnInit(): void {
    this.getGroupChats();
  }

  getGroupChats(): void {
    this.groupsService
      .getGroupChats()
      .subscribe((groups) => (this.groups = groups));
  }

  createGroupChat(): void {
    const dialogRef = this.dialog.open(CreateGroupChatComponent);

    dialogRef.afterClosed().subscribe((group: IGroup) => {
      if (group) {
        this.getGroupChats();
      }
    });
  }

  openGroupChat(id: string): void {
    
    this.activeChatService.activeChatSubject.next(id);

    this.router.navigateByUrl('/chat');
  }
}
