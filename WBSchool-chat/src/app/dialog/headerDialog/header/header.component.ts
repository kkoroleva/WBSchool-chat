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
  outChatFriend,
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

  private chatGroup$: Observable<string> = this.store$.pipe(
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
    this.chatGroup$.subscribe((id) => {
      this.store$.dispatch(getInfoChat({ chatId: id }));
    });
    this.chatInfo$.subscribe((data) => (this.chatInfo = data));
  }

  getModalWindow(chatInfo: IChatInfo): void {
    this.modalWindow.open(EditGroupChatComponent, {
      panelClass: 'edit-group-chat-modal',
      maxWidth: '100vw',
    });
    this.store$.dispatch(setGroup({ group: chatInfo }));
    this.store$.dispatch(changeChatGroup({ chatGroup: chatInfo._id }));
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
    if (user._id === chatInfo.owner) {
      this.modalWindow.open(OutFromGroupComponent, {
        panelClass: 'out-group-chat-modal',
        maxWidth: '100vw',
      });

      this.store$.dispatch(setGroup({ group: chatInfo }));
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  modalClick() {
    if (this.chatInfo) this.modalServ.searchAndOpenDialog(this.chatInfo?.name);
  }

  outChat(chatId: string, id: string) {
    this.store$.dispatch(outChatFriend({ chatId: chatId, _id: id }));
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 0);
  }

}
