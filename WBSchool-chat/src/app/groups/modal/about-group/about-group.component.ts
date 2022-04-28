import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectGroup,
  selectGroupUsers,
} from './../../../store/selectors/groups.selectors';
import { IGroup } from '../../group';
import { IUser } from '../../user';
import { IGroupsState } from 'src/app/store/reducers/groups.reducers';
import {
  getGroupUsers,
  setGroupUsers,
} from 'src/app/store/actions/groups.actions';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-about-group',
  templateUrl: './about-group.component.html',
  styleUrls: ['./../../groups.component.scss'],
})
export class AboutGroupComponent implements OnInit {
  public usersIsLoaded = false;
  public group$: Observable<IGroup> = this.store$.pipe(select(selectGroup));
  public groupUsers$: Observable<IUser[]> = this.store$.pipe(
    select(selectGroupUsers)
  );

  constructor(private store$: Store<IGroupsState>, private actions$: Actions) {}

  ngOnInit(): void {
    this.group$.subscribe((group) =>
      this.store$.dispatch(getGroupUsers({ id: group._id! }))
    );

    this.actions$
      .pipe(ofType(setGroupUsers))
      .subscribe(() => (this.usersIsLoaded = true));
  }

  checkUser(user: IUser): void {
    console.log(user);
  }
}
