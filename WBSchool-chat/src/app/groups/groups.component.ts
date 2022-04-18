import { ActiveChatService } from './../active-chat.service';
import { Router } from '@angular/router';
import { GroupsService } from './groups.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupChatComponent } from './modal/create-group-chat/create-group-chat.component';
import { IGroup, IGroupsState } from '../store/reducers/groups.reducers';
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
  public groupsState$: Observable<IGroup[]> = this.store$.pipe(
    select(selectGroups)
  );

  constructor(
    private groupsService: GroupsService,
    public dialog: MatDialog,
    private store$: Store<IGroupsState>,
    private router: Router,
    private activeChatService: ActiveChatService,
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(loadGroups());
  }

  createGroupChat(): void {
    const dialogRef = this.dialog.open(CreateGroupChatComponent);
  }

  openGroupChat(id: string): void {
    this.store$.dispatch(changeChatGroup({chatGroup: id}));
    localStorage.setItem('chatID', id);

    this.router.navigateByUrl('/chat');
  }
}
