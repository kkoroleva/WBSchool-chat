import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../dialog.service';
import { select, Store } from '@ngrx/store';
import { IChatInfo } from 'src/app/store/reducers/dialog.reducer';
import { Observable } from 'rxjs';
import { selectChatGroup } from 'src/app/store/selectors/groups.selectors';
import { getInfoChat } from 'src/app/store/actions/dialog.action';
import { selectChatInfo } from 'src/app/store/selectors/dialog.selector';
import { IUserData } from 'src/app/auth/interfaces';
import { ModalProfileService } from 'src/app/modal-profile/service/modal-profile.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  userData: IUserData | undefined;

  private chatGroup$: Observable<string> = this.store$.pipe(
    select(selectChatGroup)
  )

  public chatInfo$: Observable<IChatInfo> = this.store$.pipe(
    select(selectChatInfo)
  )

  constructor(
    private store$: Store<IChatInfo>,
    private modalServ: ModalProfileService
  ) { }

  ngOnInit(): void {
    this.chatGroup$.subscribe((id: string) => {
        this.store$.dispatch(getInfoChat({ chatId: id }))
    })
    this.chatInfo$.subscribe(item => {
      console.log('called for ' + item.name)
      this.userData = {
        email: '',
        username: item.name,
        userRights: '',
        avatar: item.avatar,
        about: item.about,
        _id: item._id,
        v: item.__v,
        formatImage: item.formatImage
      }
      }
    )
  }

  deleteChat() {
    console.log('удалить чат')
  }

  modalClick() {
    if (this.userData != undefined) this.modalServ.openDialog(this.userData)
  }
}
