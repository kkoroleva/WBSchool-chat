import { selectGroup } from './../../../store/selectors/groups.selectors';
import { MatChipList } from '@angular/material/chips';
import { IGroupsState } from './../../../store/reducers/groups.reducers';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IUser } from '../../../../interfaces/user.groups-interface';
import { selectGroupUsers } from './../../../store/selectors/groups.selectors';
import {
  changeChatGroup,
  exitFromGroup,
  getGroupUsers,
} from './../../../store/actions/groups.actions';
import { IGroup } from '../../../../interfaces/group-interface';
import { Router } from '@angular/router';
import { selectUser } from './../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-out-from-group',
  templateUrl: './out-from-group.component.html',
  styleUrls: ['./../../groups.component.scss'],
})
export class OutFromGroupComponent implements OnInit {
  @ViewChild('ownersInput') ownersInput!: ElementRef<HTMLInputElement>;
  @ViewChild('owners') ownersMatChipList!: MatChipList;

  private user!: IUser;
  public form!: FormGroup;
  private chatId!: string;
  public ownersControl = new FormControl();
  public usersIsLoaded = false;
  public groupUsers$: Observable<IUser[]> = this.store$.pipe(
    select(selectGroupUsers)
  );
  public usersList: IUser[] = [];
  public group$: Observable<IGroup> = this.store$.pipe(select(selectGroup));
  public user$: Observable<IUser> = this.store$.pipe(select(selectUser));

  constructor(
    private dialogRef: MatDialogRef<OutFromGroupComponent>,
    private actions$: Actions,
    private store$: Store<IGroupsState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => (this.user = user));

    this.group$.subscribe((group) => {
      this.chatId = group._id!;
    });

    this.form = new FormGroup({
      owners: new FormControl(
        [],
        [Validators.required, Validators.maxLength(1)]
      ),
    });

    this.getGroupChatUsers();

    this.actions$.pipe(ofType(exitFromGroup)).subscribe(() => {
      this.dialogRef.close();
    });
  }

  ngDoCheck(): void {
    if (this.ownersMatChipList) {
      if (this.form.get('owners')?.value.length !== 1) {
        this.ownersMatChipList.errorState = true;
      } else {
        this.ownersMatChipList.errorState = false;
      }
    }
  }

  getGroupChatUsers(): void {
    this.store$.dispatch(getGroupUsers({ id: this.chatId }));

    this.groupUsers$.subscribe((users) => {
      this.usersList = users.filter((user) => user._id !== this.user._id);
      this.usersIsLoaded = true;

      this.groupUsers$ = this.ownersControl.valueChanges.pipe(
        startWith(''),
        map((username: string | null) =>
          username ? this.filterUsers(username) : this.usersList
        )
      );
    });
  }

  outFromGroupChat(): void {
    const owners: IUser[] = this.form.get('owners')?.value;

    if (this.form.valid) {
      this.store$.dispatch(
        exitFromGroup({ id: this.chatId, owner: owners[0]._id })
      );
      this.router.navigateByUrl('/home');
      this.store$.dispatch(
        changeChatGroup({ chatGroup: '', isPrivate: false })
      );
      localStorage.removeItem('chatID');
    }
  }

  removeOwner(user: IUser): void {
    const owners = this.form.get('owners') as FormControl;
    const ownersValue = owners.value as IUser[];

    owners.patchValue(ownersValue.filter((owner) => owner._id !== user._id));

    this.usersList.push(user);
  }

  selectOwner(event: MatAutocompleteSelectedEvent): void {
    const owners = this.form.get('owners') as FormControl;
    const ownersValue = owners.value as IUser[];
    const owner: IUser = {
      username: event.option.value.username,
      _id: event.option.value._id,
      avatar: event.option.value.avatar,
      formatImage: event.option.value.formatImage,
    };

    owners.patchValue([...ownersValue, owner]);

    this.usersList = this.usersList.filter(
      (user) => user._id !== event.option.value._id
    );

    this.ownersInput.nativeElement.value = '';
    this.ownersControl.setValue(null);
  }

  private filterUsers(username: string): IUser[] {
    const filterUsername =
      typeof username === 'string' ? username.toLowerCase() : '';

    return this.usersList.filter((user) =>
      user.username.toLowerCase().includes(filterUsername)
    );
  }
}
