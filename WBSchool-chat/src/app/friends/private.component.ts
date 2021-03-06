import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { IPrivate } from '../../interfaces/private-interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { selectFriends } from '../store/selectors/groups.selectors';
import { IGroupsState } from '../store/reducers/groups.reducers';
import { select, Store } from '@ngrx/store';
import {
  changeChatGroup,
  loadFriends,
  outFromChatFriend,
} from '../store/actions/groups.actions';
import { MatDialog } from '@angular/material/dialog';
import { CreatePrivateChatComponent } from './create-private-chat/create-private-chat.component';
import { selectUser } from '../store/selectors/auth.selectors';
import { IUserData } from '../../interfaces/auth-interface';
import { getAllChatsMessages } from '../store/actions/dialog.action';
import { selectAllChatsMessages } from '../store/selectors/dialog.selector';
import { ThreadsService } from '../threads/threads.service';
import { IAllMessages } from '../../interfaces/lastMessages-interface';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateComponent implements OnInit {
  isThreads: boolean = false;

  public friendsState$: Observable<IPrivate[]> = this.store$.pipe(
    select(selectFriends)
  );

  public user$: Observable<IUserData> = this.store$.pipe(select(selectUser));

  public allLastMessages$: Observable<IAllMessages[]> = this.store$.pipe(
    select(selectAllChatsMessages)
  );

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store$: Store<IGroupsState>,
    private threadService: ThreadsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.router.url === '/chat') {
      this.threadService.isThreads$.subscribe((isThreads) => {
        this.isThreads = isThreads;
        this.changeDetectorRef.markForCheck();
      });
    }

    this.store$.dispatch(loadFriends());
    let chatsLength: number | undefined = 0;
    this.store$.pipe(select(selectAllChatsMessages)).subscribe((messages) => {
      chatsLength = messages.length;
      this.changeDetectorRef.markForCheck();
    });
    this.friendsState$.subscribe((chats: IPrivate[]) => {
      if (chatsLength === 0) {
        chats.forEach((chat: IPrivate) => {
          this.store$.dispatch(getAllChatsMessages({ chatId: chat._id! }));
        });
      }
      this.changeDetectorRef.markForCheck();
    });
  }

  goToChat(chatId: string): void {
    this.store$.dispatch(
      changeChatGroup({ chatGroup: chatId, isPrivate: true })
    );
    localStorage.setItem('chatID', chatId);
    localStorage.setItem('isPrivate', 'true');
    if (this.router.url.includes('/chat')) {
      (document.querySelector('#messages') as HTMLInputElement).checked = true;
    } else {
      this.router.navigateByUrl('/chat');
    }
  }

  // getFriend(data: IPrivate): string {
  //   return data.users[0] === data.owner ? data.users[0] : data.users[1];
  // }

  createPrivateChat(): void {
    this.dialog.open(CreatePrivateChatComponent, {
      panelClass: 'create-private-chat-modal',
      maxWidth: '100vw',
    });
  }

  outFromChat(_id: string, userId: string) {
    let result = confirm('???? ?????????? ???????????? ?????????? ???? ?????????');
    if (!!result) {
      this.store$.dispatch(outFromChatFriend({ chatId: _id, owner: userId }));
      setTimeout(() => {
        this.store$.dispatch(loadFriends());
      }, 200);
    }
  }
}
