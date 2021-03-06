import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectChatGroup } from '../../../store/selectors/groups.selectors';
import { getInfoChat } from '../../../store/actions/dialog.action';
import { selectChatInfo } from '../../../store/selectors/dialog.selector';
import { MatDialog } from '@angular/material/dialog';
import { EditGroupChatComponent } from '../../../groups/modal/edit-group-chat/edit-group-chat.component';
import {
  changeChatGroup,
  exitFromGroup,
  outFromChatFriend,
  setGroup,
} from '../../../store/actions/groups.actions';
import { IUserData } from '../../../../interfaces/auth-interface';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { Router } from '@angular/router';
import { AboutGroupComponent } from './../../../groups/modal/about-group/about-group.component';
import { OutFromGroupComponent } from './../../../groups/modal/out-from-group/out-from-group.component';
import { ModalProfileService } from './../../../modal-profile/service/modal-profile.service';
import { IChatInfo } from '../../../../interfaces/dialog-interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  chatInfo: IChatInfo | undefined;
  myName = '';

  public chatGroup$: Observable<any> = this.store$.pipe(
    select(selectChatGroup)
  );

  public chatInfo$: Observable<IChatInfo> = this.store$.pipe(
    select(selectChatInfo)
  );

  constructor(
    private store$: Store<IChatInfo>,
    private modalServ: ModalProfileService,
    private router: Router,
    private modalWindow: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  public user$: Observable<IUserData> = this.store$.pipe(select(selectUser));

  ngOnInit(): void {
    this.chatGroup$.subscribe((chatGroup) => {
      this.store$.dispatch(
        getInfoChat({
          chatId: chatGroup.chatGroup,
          isPrivate: chatGroup.isPrivate,
        })
      );
      this.changeDetectorRef.markForCheck();
    });
    this.chatInfo$.subscribe((data) => {
      if (data) {
        this.chatInfo = data;
      }
      this.changeDetectorRef.markForCheck();
    });
    this.chatInfo$.subscribe((data) => {
      this.chatInfo = data;
      this.changeDetectorRef.markForCheck();
    });
    this.user$.subscribe((user) => {
      this.myName = user.username;
      this.changeDetectorRef.markForCheck();
    });
  }

  getModalWindow(chatInfo: IChatInfo): void {
    this.modalWindow.open(EditGroupChatComponent, {
      panelClass: 'edit-group-chat-modal',
      maxWidth: '100vw',
    });
    this.store$.dispatch(setGroup({ group: chatInfo }));
  }

  aboutChat(chatInfo: IChatInfo): void {
    this.modalWindow.open(AboutGroupComponent, {
      panelClass: 'about-group-chat-modal',
      maxWidth: '100vw',
    });
    this.store$.dispatch(setGroup({ group: chatInfo }));
  }

  leaveFromChat(
    chatInfo: IChatInfo,
    user: IUserData,
    isPrivate: boolean
  ): void {
    if (chatInfo.owners[0] === user._id && !isPrivate) {
      this.modalWindow.open(OutFromGroupComponent, {
        panelClass: 'out-group-chat-modal',
        maxWidth: '100vw',
      });
      this.store$.dispatch(setGroup({ group: chatInfo }));
    } else {
      if (isPrivate) {
        this.store$.dispatch(
          outFromChatFriend({ chatId: chatInfo._id, owner: user._id })
        );
      } else {
        this.store$.dispatch(exitFromGroup({ id: chatInfo._id }));
      }

      this.store$.dispatch(
        changeChatGroup({ chatGroup: '', isPrivate: false })
      );
      localStorage.removeItem('chatID');
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 200);
    }
  }

  modalClick() {
    if (this.chatInfo && this.chatInfo.users.length < 3)
      this.modalServ.searchAndOpenDialog(this.chatInfo?.name);
    const searchName =
      this.myName == this.chatInfo?.usernames[0]
        ? this.chatInfo?.usernames[1]
        : this.chatInfo?.usernames[0];

    if (this.chatInfo && this.chatInfo.users.length < 3)
      this.modalServ.searchAndOpenDialog(searchName!);
  }
}
