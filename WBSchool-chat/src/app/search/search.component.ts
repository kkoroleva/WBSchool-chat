import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable, startWith } from 'rxjs';
import { IPrivate } from '../friends/private';
import {
  changeChatGroup,
  loadFriends,
  loadGroups,
} from '../store/actions/groups.actions';
import { IGroup, IGroupsState } from '../store/reducers/groups.reducers';
import {
  selectFriends,
  selectGroups,
} from '../store/selectors/groups.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchType = 'msg';
  searchQuery = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredPrvtChats!: Observable<IPrivate[]>;
  filteredGroups!: Observable<IGroup[]>;
  chats: IPrivate[] = [];
  groups: IGroup[] = [];

  constructor(private router: Router, private store$: Store<IGroupsState>) {}

  public friendsState$: Observable<IPrivate[]> = this.store$.pipe(
    select(selectFriends)
  );

  public groups$: Observable<IGroup[]> = this.store$.pipe(select(selectGroups));

  pickMsg() {
    this.searchType = 'msg';
    this.searchQuery.setValue('');
  }

  pickGroup() {
    this.searchType = 'grp';
    this.searchQuery.setValue('');
  }

  ngOnInit(): void {
    this.store$.dispatch(loadFriends());
    this.store$.dispatch(loadGroups());
    this.pickMsg();
    this.filteredPrvtChats = this.searchQuery.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterChats(value))
    );
    this.filteredGroups = this.searchQuery.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterGroups(value))
    );
    this.friendsState$.subscribe((chats) => {
      this.chats = chats;
    });
    this.groups$.subscribe((chats) => {
      this.groups = chats;
    });
  }

  private _filterChats(value: string): IPrivate[] {
    const filterValue = value.toLowerCase();
    return this.chats.filter((chat: IPrivate) =>
      chat.name!.toLowerCase().includes(filterValue)
    );
  }

  private _filterGroups(value: string): IGroup[] {
    const filterValue = value.toLowerCase();
    return this.groups.filter((chat: IGroup) =>
      chat.name!.toLowerCase().includes(filterValue)
    );
  }

  goToChat(chatId: string) {
    this.store$.dispatch(changeChatGroup({ chatGroup: chatId }));
    localStorage.setItem('chatID', chatId);
    this.router.navigateByUrl('/chat');
  }
}
