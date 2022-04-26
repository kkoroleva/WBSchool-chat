import { selectGroup } from './../../../store/selectors/groups.selectors';
import { MatChipList } from '@angular/material/chips';
import { IGroupsState } from './../../../store/reducers/groups.reducers';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IUser } from '../../user';
import { selectGroupUsers } from 'src/app/store/selectors/groups.selectors';
import { getGroupUsers } from 'src/app/store/actions/groups.actions';
import { IGroup } from '../../group';

@Component({
  selector: 'app-out-from-group',
  templateUrl: './out-from-group.component.html',
  styleUrls: ['./out-from-group.component.scss'],
})
export class OutFromGroupComponent implements OnInit {
  @ViewChild('ownersInput') ownersInput!: ElementRef<HTMLInputElement>;
  @ViewChild('owners') ownersMatChipList!: MatChipList;

  public form!: FormGroup;
  private chatId!: string;
  public ownersControl = new FormControl();
  public usersIsLoaded = false;
  public groupUsers$: Observable<IUser[]> = this.store$.pipe(
    select(selectGroupUsers)
  );
  public usersList: IUser[] = [];
  public group$: Observable<IGroup> = this.store$.pipe(select(selectGroup));

  constructor(
    private dialogRef: MatDialogRef<OutFromGroupComponent>,
    private actions$: Actions,
    private store$: Store<IGroupsState>
  ) {}

  ngOnInit(): void {
    this.group$.subscribe((group) => {
      this.chatId = group._id!;
    });

    this.form = new FormGroup({
      owners: new FormControl([], [Validators.required]),
    });

    this.getGroupChatUsers();

    // сделать экшен когда будет на сервере реализация
    // this.actions$.pipe(ofType(editToGroups, deleteFromGroups)).subscribe(() => {
    //   this.dialogRef.close();
    // });
  }

  getGroupChatUsers(): void {
    this.store$.dispatch(getGroupUsers({ id: this.chatId }));

    this.groupUsers$.subscribe((users) => {
      this.usersList = users;
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
      console.log(owners.map((owner) => owner._id));
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
