import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectGroup,
  selectGroupUsers,
} from './../../../store/selectors/groups.selectors';
import { IGroup } from '../../../../interfaces/group-interface';
import { IUser } from '../../../../interfaces/user.groups-interface';
import { IGroupsState } from './../../../store/reducers/groups.reducers';
import {
  getGroupUsers,
  setGroupUsers,
} from './../../../store/actions/groups.actions';
import { Actions, ofType } from '@ngrx/effects';
import { ModalProfileService } from 'src/app/modal-profile/service/modal-profile.service';

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

  constructor(
    private store$: Store<IGroupsState>, 
    private actions$: Actions,
    private modalServ: ModalProfileService
  ) {}

  ngOnInit(): void {
    this.group$.subscribe((group) =>
      this.store$.dispatch(getGroupUsers({ id: group._id! }))
    );

    this.actions$
      .pipe(ofType(setGroupUsers))
      .subscribe(() => (this.usersIsLoaded = true));
  }

  checkUser(user: IUser): void {
    this.modalServ.searchAndOpenDialog(user.username);
  }
}
