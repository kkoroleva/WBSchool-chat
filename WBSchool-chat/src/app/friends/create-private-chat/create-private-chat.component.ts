import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { concatMap, map, Observable, startWith } from 'rxjs';
import { IUserData } from '../../../interfaces/auth-interface';
import {
  initContacts,
  pushContacts,
} from '../../store/actions/contacts.actions';
import {
  changeChatGroup,
  createChatFriend,
  loadFriends,
  pushToFriends,
  returnIntoChatFriend,
} from '../../store/actions/groups.actions';

import { IGroupsState } from './../../store/reducers/groups.reducers';
import { selectUser } from './../../store/selectors/auth.selectors';
import { selectContacts } from './../../store/selectors/contacts.selectors';
import { selectFriends } from './../../store/selectors/groups.selectors';
import { IPrivate } from '../../../interfaces/private-interface';
import { ProfileSettingsService } from '../../../app/profile-page/services/profile-settings.service';

@Component({
  selector: 'app-create-private-chat',
  templateUrl: './create-private-chat.component.html',
  styleUrls: ['./create-private-chat.component.scss'],
})
export class CreatePrivateChatComponent implements OnInit {
  public contactsList: IUserData[] = [];
  public contactsControl!: FormControl;
  public form: FormGroup;
  public contacts$: Observable<IUserData[]> = this.store$.pipe(
    select(selectContacts),
    map((contacts) => contacts.contacts)
  );
  private user$: Observable<IUserData> = this.store$.pipe(select(selectUser));
  public myContacts!: IUserData[];
  public contactsIsLoaded = false;

  constructor(
    private dialogRef: MatDialogRef<CreatePrivateChatComponent>,
    private store$: Store<IGroupsState>,
    private actions$: Actions,
    private router: Router,
    private profileServ: ProfileSettingsService
  ) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.actions$.pipe(ofType(pushToFriends)).subscribe(() => {
      this.dialogRef.close();
    });

    this.getContacts();

    this.contactsControl = this.form.get('username') as FormControl;
  }

  getContacts(): void {
    this.store$.dispatch(initContacts());

    this.actions$.pipe(ofType(pushContacts)).subscribe(({ contacts }) => {
      this.contactsList = contacts.contacts;
      this.myContacts = contacts.contacts;
      this.contactsIsLoaded = true;

      this.contacts$ = this.contactsControl.valueChanges.pipe(
        startWith(''),
        map((username: string | null) =>
          username ? this.filterContacts(username) : this.contactsList
        )
      );
    });
  }

  createPrivateChat(): void {
    const username: string = this.contactsControl.value.trim();
    let clone: IPrivate | undefined;
    this.store$.pipe(select(selectFriends)).subscribe((chats: IPrivate[]) => {
      clone = chats.find(
        (chat: IPrivate) =>
          chat.usernames[0] === username || chat.usernames[1] === username
      );
    });
    if (!clone) {
      this.profileServ
        .getUsers(username)
        .pipe(
          concatMap((user: IUserData) => this.profileServ.getOwners(user._id))
        )
        .subscribe((res: any) => {
          if (res[0]) {
            this.user$.subscribe({
              next: () =>
                this.store$.dispatch(
                  returnIntoChatFriend({
                    chatId: res[0]._id,
                    users: res[0].owners,
                  })
                ),
            });
          } else {
            this.user$.subscribe({
              next: (user) =>
                this.store$.dispatch(
                  createChatFriend({
                    username,
                    ownerUsername: user.username,
                    ownerFormatImage: user.formatImage!,
                    ownerAvatar: user.avatar!,
                  })
                ),
            });
          }
        });
    } else {
      this.store$.dispatch(
        changeChatGroup({ chatGroup: clone._id!, isPrivate: true })
      );
      this.router.navigateByUrl('/chat');
    }
    setTimeout(() => {
      this.store$.dispatch(loadFriends());
    }, 200);
    this.dialogRef.close();
  }

  private filterContacts(username: string): IUserData[] {
    const filterUsername = username.toLowerCase();

    return this.contactsList.filter((contact) =>
      contact.username.toLowerCase().includes(filterUsername)
    );
  }
}
