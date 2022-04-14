import { GroupsService } from './groups.service';
import { Component, OnInit } from '@angular/core';
import { IGroup } from './group';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupChatComponent } from './modal/create-group-chat/create-group-chat.component';
import { IGroupsState } from '../store/reducers/groups.reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectGroups } from '../store/selectors/groups.selectors';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  groups: IGroup[] = [];
  groupsState: IGroupsState = { groups: [] };
  public groupsState$: Observable<IGroupsState> = this.store$.pipe(
    select(selectGroups)
  );

  constructor(
    private groupsService: GroupsService,
    public dialog: MatDialog,
    private store$: Store<IGroupsState>
  ) {}

  ngOnInit(): void {
    this.getGroups();
    this.getGroupChats();
  }

  getGroups(): void {
    this.groupsState$.subscribe((el) => {
      this.groupsState = el;
    });
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
}
