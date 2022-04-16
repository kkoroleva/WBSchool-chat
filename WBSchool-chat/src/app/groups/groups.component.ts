import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IGroup } from './group';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupChatComponent } from './modal/create-group-chat/create-group-chat.component';
import { IGroupsState } from '../store/reducers/groups.reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectGroups } from '../store/selectors/groups.selectors';
import { changeChatGroup, loadGroups } from '../store/actions/groups.actions';

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
    this.dialog.open(CreateGroupChatComponent);
  }

  openGroupChat(id: string): void {
    this.store$.dispatch(changeChatGroup({ chatGroup: id }));
    localStorage.setItem('chatID', id);

    this.router.navigateByUrl('/chat');
  }
}
