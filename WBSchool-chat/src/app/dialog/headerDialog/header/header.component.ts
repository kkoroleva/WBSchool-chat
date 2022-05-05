import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { IChatInfo } from '../../../store/reducers/dialog.reducer';
import { Observable } from 'rxjs';
import { selectChatGroup } from '../../../store/selectors/groups.selectors';
import { getInfoChat } from '../../../store/actions/dialog.action';
import { selectChatInfo } from '../../../store/selectors/dialog.selector';
import { MatDialog } from '@angular/material/dialog';
import { EditGroupChatComponent } from '../../../groups/modal/edit-group-chat/edit-group-chat.component';
import {
  changeChatGroup,
  outFromChatFriend,
  setGroup,
} from '../../../store/actions/groups.actions';
import { IUserData } from '../../../auth/interfaces';
import { selectUser } from '../../../store/selectors/auth.selectors';
import {
  deleteChatFriend,
  loadFriends,
} from '../../../store/actions/groups.actions';
import { Router } from '@angular/router';
import { AboutGroupComponent } from './../../../groups/modal/about-group/about-group.component';
import { OutFromGroupComponent } from './../../../groups/modal/out-from-group/out-from-group.component';
import { ModalProfileService } from './../../../modal-profile/service/modal-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  chatInfo: IChatInfo | undefined;

  private chatGroup$: Observable<any> = this.store$.pipe(
    select(selectChatGroup)
  );

  public chatInfo$: Observable<IChatInfo> = this.store$.pipe(
    select(selectChatInfo)
  );

  constructor(
    private store$: Store<IChatInfo>,
    private modalServ: ModalProfileService,
    private router: Router,
    private modalWindow: MatDialog
  ) {}
  public user$: Observable<IUserData> = this.store$.pipe(select(selectUser));

  ngOnInit(): void {
    this.chatGroup$.subscribe((chatGroup) => {
      this.store$.dispatch(getInfoChat({ chatId: chatGroup.chatGroup, isPrivate: chatGroup.isPrivate }));
    });
    this.chatInfo$.subscribe((data) => {
      if (data) {
        this.chatInfo = data;
      }
    });
  }

  getModalWindow(chatInfo: IChatInfo): void {
    this.modalWindow.open(EditGroupChatComponent, {
      panelClass: 'edit-group-chat-modal',
      maxWidth: '100vw',
    });
    this.store$.dispatch(setGroup({ group: chatInfo }));
    this.store$.dispatch(changeChatGroup({ chatGroup: chatInfo._id, isPrivate: false }));
  }

  deleteChat(_id: string) {
    this.store$.dispatch(deleteChatFriend({ chatId: _id }));
    this.store$.dispatch(loadFriends());
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 0);
  }

  aboutChat(chatInfo: IChatInfo): void {
    this.modalWindow.open(AboutGroupComponent, {
      panelClass: 'about-group-chat-modal',
      maxWidth: '100vw',
    });

    this.store$.dispatch(setGroup({ group: chatInfo }));
  }

  leaveFromChat(chatInfo: IChatInfo, user: IUserData): void {
    if (chatInfo.owners[2] === user._id) {
      this.modalWindow.open(OutFromGroupComponent, {
        panelClass: 'out-group-chat-modal',
        maxWidth: '100vw',
      });
      this.store$.dispatch(setGroup({ group: chatInfo }));
    } else {
      this.store$.dispatch(outFromChatFriend({ chatId: chatInfo._id, owner: user._id }));
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 200)
    }
  }

  modalClick() {
    if (this.chatInfo && this.chatInfo.users.length < 3) this.modalServ.searchAndOpenDialog(this.chatInfo?.name);
  }
}
