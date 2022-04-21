import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, Observable, startWith } from 'rxjs';
import { IUserData } from 'src/app/auth/interfaces';
import {
  initContacts,
  pushContacts,
} from 'src/app/store/actions/contacts.actions';
import {
  createChatFriend,
  pushToFriends,
} from 'src/app/store/actions/groups.actions';

import { IGroupsState } from 'src/app/store/reducers/groups.reducers';
import { selectUser } from 'src/app/store/selectors/auth.selectors';
import { selectContacts } from 'src/app/store/selectors/contacts.selectors';

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

  constructor(
    private dialogRef: MatDialogRef<CreatePrivateChatComponent>,
    private store$: Store<IGroupsState>,
    private actions$: Actions
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

      this.contacts$ = this.contactsControl.valueChanges.pipe(
        startWith(''),
        map((username: string | null) =>
          username ? this.filterContacts(username) : this.contactsList
        )
      );
    });
  }

  createPrivateChat(): void {
    const username: string = this.contactsControl.value;

    if (this.form.valid) {
      this.user$.subscribe((user) => {
        this.store$.dispatch(
          createChatFriend({ username, ownerUsername: user.username })
        );
      });
    }
  }

  private filterContacts(username: string): IUserData[] {
    const filterUsername = username.toLowerCase();

    return this.contactsList.filter((contact) =>
      contact.username.toLowerCase().includes(filterUsername)
    );
  }
}
