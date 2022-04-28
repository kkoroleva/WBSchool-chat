import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupChatComponent } from './modal/create-group-chat/create-group-chat.component';
import { IGroupsState } from '../store/reducers/groups.reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectAllGroupsMessages,
  selectGroups,
} from '../store/selectors/groups.selectors';
import {
  allGroupsMessages,
  changeChatGroup,
  getAllGroupsMessages,
  loadGroups,
} from '../store/actions/groups.actions';
import { IGroup } from './group';
import { IAllMessages } from '../store/reducers/dialog.reducer';
import { SocketService } from '../socket/socket.service';
import { IMessage } from '../dialog/dialog';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  public groups$: Observable<IGroup[]> = this.store$.pipe(select(selectGroups));
  public lastMessages$: Observable<IAllMessages[]> = this.store$.pipe(
    select(selectAllGroupsMessages)
  );

  constructor(
    public dialog: MatDialog,
    private store$: Store<IGroupsState>,
    private router: Router,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.getGroupChats();

    let chatsLength = 0;

    this.store$.pipe(select(selectAllGroupsMessages)).subscribe((messages) => {
      chatsLength = messages.length;
    });

    this.groups$.subscribe((groups) => {
      if (!chatsLength) {
        groups.forEach((group) => {
          this.store$.dispatch(getAllGroupsMessages({ chatId: group._id! }));
        });
      }
    });

    this.getLastMessages();
  }

  getLastMessages() {
    this.socketService.onMessage().subscribe((message: IMessage) => {
      this.store$.dispatch(
        allGroupsMessages({
          chatId: message.chatId!,
          lastMessage: message.text,
        })
      );
    });
    this.socketService.onDeleteMessage().subscribe((messageId: string) => {
      console.log(messageId);
    });
    this.socketService.onUpdateMessage().subscribe((message: IMessage) => {
      this.store$.dispatch(
        allGroupsMessages({
          chatId: message.chatId!,
          lastMessage: message.text,
        })
      );
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
