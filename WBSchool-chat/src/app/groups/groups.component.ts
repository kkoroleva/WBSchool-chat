import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
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
  exitFromGroup,
  getAllGroupsMessages,
  loadGroups,
  setGroup,
} from '../store/actions/groups.actions';
import { ThreadsService } from '../threads/threads.service';
import { IGroup, IGroupsMessages } from '../../interfaces/group-interface';
import { OutFromGroupComponent } from './modal/out-from-group/out-from-group.component';
import { IUserData } from './../../interfaces/auth-interface';
import { selectUser } from '../store/selectors/auth.selectors';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {
  public isThreads: boolean = false;
  private user$: Observable<IUserData> = this.store$.pipe(select(selectUser));
  private user!: IUserData;
  public groups$: Observable<IGroup[]> = this.store$.pipe(select(selectGroups));
  public lastMessages$: Observable<IGroupsMessages[]> = this.store$.pipe(
    select(selectLastGroupsMessages)
  );

  constructor(
    public dialog: MatDialog,
    private store$: Store<IGroupsState>,
    private router: Router,
    private threadService: ThreadsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.user = user;
      this.changeDetectorRef.markForCheck();
    });

    if (this.router.url === '/chat') {
      this.threadService.isThreads$.subscribe((isThreads) => {
        this.isThreads = isThreads;
        this.changeDetectorRef.markForCheck();
      });
    }

    this.getGroupChats();
    this.getLastMessages();
  }

  getLastMessages() {
    let chatsLength = 0;

    this.store$.pipe(select(selectLastGroupsMessages)).subscribe((messages) => {
      chatsLength = messages.length;
      this.changeDetectorRef.markForCheck();
    });

    this.groups$.subscribe((groups) => {
      if (!chatsLength) {
        groups.forEach((group) => {
          this.store$.dispatch(getAllGroupsMessages({ chatId: group._id! }));
        });
      }
      this.changeDetectorRef.markForCheck();
    });
  }

  getGroupChats(): void {
    this.store$.dispatch(loadGroups());
  }

  leaveFromChat(group: IGroup): void {
    if (group.owners![0] === this.user._id) {
      this.dialog.open(OutFromGroupComponent, {
        panelClass: 'out-group-chat-modal',
        maxWidth: '100vw',
      });
      this.store$.dispatch(setGroup({ group }));
    } else {
      this.store$.dispatch(exitFromGroup({ id: group._id! }));
      this.store$.dispatch(
        changeChatGroup({ chatGroup: '', isPrivate: false })
      );
      localStorage.removeItem('chatID');
      this.router.navigateByUrl('/home');
    }
  }

  createGroupChat(): void {
    this.dialog.open(CreateGroupChatComponent, {
      panelClass: 'create-group-chat-modal',
      maxWidth: '100vw',
    });
  }

  openGroupChat(group: IGroup): void {
    this.store$.dispatch(
      changeChatGroup({ chatGroup: group._id!, isPrivate: false })
    );
    localStorage.setItem('chatID', group._id!);
    localStorage.setItem('isPrivate', 'false');

    if (this.router.url.includes('/chat')) {
      (document.querySelector('#messages') as HTMLInputElement).checked = true;
    } else {
      this.router.navigateByUrl('/chat');
    }
  }
}
