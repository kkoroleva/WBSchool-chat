import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../dialog.service';
import { select, Store } from '@ngrx/store';
import { IChatInfo } from 'src/app/store/reducers/dialog.reducer';
import { Observable } from 'rxjs';
import { selectChatGroup } from 'src/app/store/selectors/groups.selectors';
import { getInfoChat } from 'src/app/store/actions/dialog.action';
import { selectChatInfo } from 'src/app/store/selectors/dialog.selector';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name = "";
  avatar = "";
  formatImage = "";
  chatId = "";

  private chatGroup$: Observable<string> = this.store$.pipe(
    select(selectChatGroup)
  )

  private chatInfo$: Observable<IChatInfo> = this.store$.pipe(
    select(selectChatInfo)
  )

  constructor(private service: DialogService, private store$: Store<IChatInfo>) { }

  ngOnInit(): void {
    this.chatGroup$.subscribe((id) => {
      this.chatId = id;
      this.store$.dispatch(getInfoChat({ chatId: this.chatId }))
    })
    this.chatInfo$.subscribe((chatInfo) => {
      this.avatar = chatInfo.avatar;
      this.formatImage = chatInfo.formatImage;
      this.name = chatInfo.name
    })
  }


  deleteChat() {
    console.log('удалить чат')
  }
}
