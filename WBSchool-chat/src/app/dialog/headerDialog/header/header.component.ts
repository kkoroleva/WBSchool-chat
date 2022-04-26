import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IChatInfo } from 'src/app/store/reducers/dialog.reducer';
import { Observable, Subscription } from 'rxjs';
import { selectChatGroup } from 'src/app/store/selectors/groups.selectors';
import { getInfoChat } from 'src/app/store/actions/dialog.action';
import { selectChatInfo } from 'src/app/store/selectors/dialog.selector';
import { MatDialog } from '@angular/material/dialog';
import { EditGroupChatComponent } from 'src/app/groups/modal/edit-group-chat/edit-group-chat.component';
import { changeChatGroup, setGroup } from 'src/app/store/actions/groups.actions';
import { IUserData } from 'src/app/auth/interfaces';
import { ModalProfileService } from 'src/app/modal-profile/service/modal-profile.service';
import { selectUser } from 'src/app/store/selectors/auth.selectors';
import { deleteChatFriend, loadFriends } from 'src/app/store/actions/groups.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  chatInfo: IChatInfo | undefined 

  private chatGroup$: Observable<string> = this.store$.pipe(
    select(selectChatGroup)
  );

  public chatInfo$: Observable<IChatInfo> = this.store$.pipe(
    select(selectChatInfo)
  );

  constructor( private store$: Store<IChatInfo>,
    private modalServ: ModalProfileService, 
    private router: Router,
    private modalWindow: MatDialog) { }
    public user$: Observable<IUserData> = this.store$.pipe(
select(selectUser)
  )


  ngOnInit(): void {
    this.chatGroup$.subscribe((id) => {
      this.store$.dispatch(getInfoChat({ chatId: id }));
    });
    this.chatInfo$.subscribe(data => this.chatInfo = data)
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

  modalClick() {
    if (this.chatInfo) this.modalServ.searchAndOpenDialog(this.chatInfo?.name)
  }

}
