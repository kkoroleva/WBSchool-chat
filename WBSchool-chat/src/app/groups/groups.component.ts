import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupChatComponent } from './modal/create-group-chat/create-group-chat.component';
import { IGroupsState } from '../store/reducers/groups.reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectLastGroupsMessages,
  selectGroups,
} from '../store/selectors/groups.selectors';
import {
  changeChatGroup,
  getAllGroupsMessages,
  loadGroups,
} from '../store/actions/groups.actions';
import { IGroup } from './group';
import { IGroupsMessages } from '../store/reducers/groups.reducers';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  public groups$: Observable<IGroup[]> = this.store$.pipe(select(selectGroups));
  public lastMessages$: Observable<IGroupsMessages[]> = this.store$.pipe(
    select(selectLastGroupsMessages)
  );

  constructor(
    public dialog: MatDialog,
    private store$: Store<IGroupsState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getGroupChats();
    this.getLastMessages();
  }

  getLastMessages() {
    let chatsLength = 0;

    this.store$.pipe(select(selectLastGroupsMessages)).subscribe((messages) => {
      chatsLength = messages.length;
    });

    this.groups$.subscribe((groups) => {
      if (!chatsLength) {
        groups.forEach((group) => {
          this.store$.dispatch(getAllGroupsMessages({ chatId: group._id! }));
        });
      }
    });
  }

  getGroupChats(): void {
    this.store$.dispatch(loadGroups());
  }

  createGroupChat(): void {
    this.dialog.open(CreateGroupChatComponent, {
      panelClass: 'create-group-chat-modal',
      maxWidth: '100vw',
    });
  }

  openGroupChat(group: IGroup): void {
    this.store$.dispatch(changeChatGroup({ chatGroup: group._id! }));
    localStorage.setItem('chatID', group._id!);

    this.router.navigateByUrl('/chat');
  }
}
