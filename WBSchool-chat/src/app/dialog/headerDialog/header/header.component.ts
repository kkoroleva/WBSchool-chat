import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IChatInfo } from '../../../store/reducers/dialog.reducer';
import { Observable } from 'rxjs';
import { selectChatGroup } from '../../../store/selectors/groups.selectors';
import { getInfoChat } from '../../../store/actions/dialog.action';
import { selectChatInfo } from '../../../store/selectors/dialog.selector';
import { MatDialog } from '@angular/material/dialog';
import { EditGroupChatComponent } from '../../../groups/modal/edit-group-chat/edit-group-chat.component';
import { changeChatGroup, outChatFriend, setGroup } from '../../../store/actions/groups.actions';
import { IUserData } from '../../../auth/interfaces';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { deleteChatFriend, loadFriends } from '../../../store/actions/groups.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private chatGroup$: Observable<string> = this.store$.pipe(
    select(selectChatGroup)
  );

  public chatInfo$: Observable<IChatInfo> = this.store$.pipe(
    select(selectChatInfo)
  );

  constructor(private store$: Store<IChatInfo>,
              private router: Router,
              private modalWindow: MatDialog) { }
              public user$: Observable<IUserData> = this.store$.pipe(
    select(selectUser)
  )


  ngOnInit(): void {
    this.chatGroup$.subscribe((id) => {
      this.store$.dispatch(getInfoChat({ chatId: id }));
    });
  }
  
  getModalWindow(chatInfo: IChatInfo): void {
    this.modalWindow.open(EditGroupChatComponent, {
      panelClass: 'edit-group-chat-modal',
      maxWidth: '100vw',
    })
    this.store$.dispatch(setGroup({ group: chatInfo }));
    this.store$.dispatch(changeChatGroup({ chatGroup: chatInfo._id }));
  }

  deleteChat(_id: string) {
    this.store$.dispatch(deleteChatFriend({chatId: _id}));
    this.store$.dispatch(loadFriends());
    setTimeout(() => {
      this.router.navigateByUrl('/home')
    }, 0)
  }

  outChat(chatId: string, id: string) {
    this.store$.dispatch(outChatFriend({chatId: chatId, _id: id}));
    setTimeout(() => {
      this.router.navigateByUrl('/home')
    }, 0)
  }

}
