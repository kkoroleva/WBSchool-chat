import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { INewUser, IUserData } from 'src/app/auth/interfaces';
import { IUser } from 'src/app/groups/user';
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
import { IFriend } from '../friend';

@Component({
  selector: 'app-create-private-chat',
  templateUrl: './create-private-chat.component.html',
  styleUrls: ['./create-private-chat.component.scss'],
})
export class CreatePrivateChatComponent implements OnInit {
  public userState$: Observable<IUserData> = this.store$.pipe(
    select(selectUser)
  );
  public contacts$: Observable<IUser[]> = this.store$.pipe(
    select(selectContacts),
    map((contacts) => contacts.contacts)
  );
  public contactsList: IUser[] = [];
  public contactsControl!: FormControl;
  public form: FormGroup;

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

      // this.contacts$ = this.contactsControl.valueChanges.pipe(
      //   startWith(''),
      //   map((username: string | null) =>
      //     username ? this.filterContacts(username) : this.contactsList
      //   )
      // );
    });
  }

  createPrivateChat(): void {
    const contacts: IUser = this.contactsControl.value;
    const username: string = contacts.username;
    const friend: IFriend = this.contactsControl.value;

    if (this.form.valid) {
      this.store$.dispatch(createChatFriend({ friend, username }));
    }
  }
}
