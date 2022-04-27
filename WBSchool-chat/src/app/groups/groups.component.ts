import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupChatComponent } from './modal/create-group-chat/create-group-chat.component';
import { IGroupsState } from '../store/reducers/groups.reducers';
import { select, Store } from '@ngrx/store';
import { Observable, zip } from 'rxjs';
import { selectGroups } from '../store/selectors/groups.selectors';
import { changeChatGroup, loadGroups } from '../store/actions/groups.actions';
import { IGroup } from './group';
import { SocketService } from '../socket/socket.service';
import { selectDialog } from '../store/selectors/dialog.selector';
import { IMessage } from '../dialog/dialog';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  public messages$: Observable<IMessage[]> = this.store$.pipe(
    select(selectDialog)
  );
  public groups$: Observable<IGroup[]> = this.store$.pipe(select(selectGroups));
  public lastMessages!: IMessage[];

  constructor(
    public dialog: MatDialog,
    private store$: Store<IGroupsState>,
    private router: Router,
    private socketService: SocketService,
    private storage: StorageMap
  ) {}

  ngOnInit(): void {
    this.getGroupChats();

    this.storage.get('lastMessages').subscribe((lastMessages: any) => {
      if (lastMessages) {
        this.lastMessages = JSON.parse(lastMessages);
      } else {
        this.lastMessages = [];
      }
    });

    this.setLastSendedMessage();
    this.setLastEditedMessage();
  }

  setLastSendedMessage(): void {
    this.socketService.onMessage().subscribe((msg) => {
      this.setLastMessage(msg);
    });
  }

  setLastEditedMessage(): void {
    this.socketService.onUpdateMessage().subscribe((msg) => {
      this.setLastMessage(msg);
    });
  }

  setLastMessage(msg: IMessage): void {
    this.lastMessages = this.lastMessages.filter(
      (lastMessage) => lastMessage.chatId !== msg.chatId
    );

    this.lastMessages.push(msg);

    this.storage
      .set('lastMessages', JSON.stringify(this.lastMessages))
      .subscribe();
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
