import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeChatGroup, loadUnreads } from '../store/actions/groups.actions';
import { IGroupsState } from '../store/reducers/groups.reducers';
import { selectUnreads } from '../store/selectors/groups.selectors';
import { IUnread } from './unread';

@Component({
  selector: 'app-unread',
  templateUrl: './unread.component.html',
  styleUrls: ['./unread.component.scss'],
})
export class UnreadsComponent implements OnInit {
  unreadList: IUnread[] = [];

  public unreadsState$: Observable<IUnread[]> = this.store$.pipe(
    select(selectUnreads)
  );

  constructor(private router: Router, private store$: Store<IGroupsState>) {}

  ngOnInit(): void {
    this.unreadsState$.subscribe((res) => {
      console.log(res);
    });
    this.getUnreads();
  }

  getUnreads(): void {
    this.store$.dispatch(loadUnreads());
  }

  decodeImg(img: string): string {
    return atob(img);
  }

  goToChat(chatId: string): void {
    this.store$.dispatch(changeChatGroup({ chatGroup: chatId }));
    localStorage.setItem('chatID', chatId);

    this.router.navigateByUrl('/chat');
  }
}
