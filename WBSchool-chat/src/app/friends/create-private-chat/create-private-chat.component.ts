import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { INewUser, IUserData } from 'src/app/auth/interfaces';
import {
  createChatFriend,
  pushToFriends,
} from 'src/app/store/actions/groups.actions';
import { IGroupsState } from 'src/app/store/reducers/groups.reducers';
import { selectUser } from 'src/app/store/selectors/auth.selectors';
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
  }

  createPrivateChat(): void {
    const username: string = this.form.get('username')?.value.trim();

    console.log(username);
    const friend: IFriend = {
      isActive: false,
      isRead: true,
      users: [],
    };

    if (this.form.valid) {
      this.store$.dispatch(createChatFriend({ friend, username }));
    }
  }
}
