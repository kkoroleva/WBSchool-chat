import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { concatMap, map, Observable, startWith, tap } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePrivateChatComponent implements OnInit {
  public contactsList: IUserData[] = [];
  private chats$: Observable<IPrivate[]> = this.store$.pipe(
    select(selectFriends)
  );
  private chats!: IPrivate[];
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
    private profileServ: ProfileSettingsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.actions$.pipe(ofType(pushToFriends)).subscribe(() => {
      this.dialogRef.close();
      this.changeDetectorRef.markForCheck();
    });

    this.getChats();
    this.getContacts();

    this.contactsControl = this.form.get('username') as FormControl;
  }

  getChats(): void {
    this.store$.dispatch(loadFriends());
  }

  getContacts(): void {
    this.store$.dispatch(initContacts());
    this.chats$.subscribe((chats) => {
      this.chats = chats;
      this.changeDetectorRef.markForCheck();
    });
    this.actions$.pipe(ofType(pushContacts)).subscribe(({ contacts }) => {
      this.myContacts = contacts.contacts;

      let cloneContacts = [...contacts.contacts];
      let cloneChatUsers = [
        ...new Set(this.chats.map((chat) => chat.users).flat()),
      ];

      cloneChatUsers.forEach((user) => {
        cloneContacts = cloneContacts.filter((contact) => contact._id !== user);
      });

      this.contactsList = cloneContacts;
      this.contactsIsLoaded = true;

      this.contacts$ = this.contactsControl.valueChanges.pipe(
        startWith(''),
        map((username: string | null) =>
          username ? this.filterContacts(username) : this.contactsList
        )
      );
      this.changeDetectorRef.markForCheck();
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
      this.changeDetectorRef.markForCheck();
    });
    if (!clone) {
      this.profileServ
        .getUsers(username)
        .pipe(
          concatMap((user: IUserData) => this.profileServ.getOwners(user._id))
        )
        .subscribe((res: any) => {
          if (res) {
            this.user$.subscribe({
              next: () =>
                this.store$.dispatch(
                  returnIntoChatFriend({ chatId: res._id, users: res.owners })
                ),
            });
          } else {
            this.user$.subscribe({
              next: (user) => {
                this.store$.dispatch(
                  createChatFriend({
                    username,
                    ownerUsername: user.username,
                    ownerFormatImage: user.formatImage!,
                    ownerAvatar: user.avatar!,
                  })
                ),
                  this.changeDetectorRef.markForCheck();
              },
            });
          }
          this.changeDetectorRef.markForCheck();
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
