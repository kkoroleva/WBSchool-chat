import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupChatComponent } from './modal/create-group-chat/create-group-chat.component';
import { IGroupsState } from '../store/reducers/groups.reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectGroups } from '../store/selectors/groups.selectors';
import {
  changeChatGroup,
  loadGroups,
  setGroup,
} from '../store/actions/groups.actions';
import { IGroup } from './group';
import { EditGroupChatComponent } from './modal/edit-group-chat/edit-group-chat.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  public groups$: Observable<IGroup[]> = this.store$.pipe(select(selectGroups));

  constructor(
    public dialog: MatDialog,
    private store$: Store<IGroupsState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getGroupChats();
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
    this.dialog.open(EditGroupChatComponent, {
      panelClass: 'edit-group-chat-modal',
      maxWidth: '100vw',
    });

    this.store$.dispatch(setGroup({ group }));
    this.store$.dispatch(changeChatGroup({ chatGroup: group._id! }));
    localStorage.setItem('chatID', group._id!);

    // this.router.navigateByUrl('/chat');
  }
}
