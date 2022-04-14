import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { changeLoadGroups, loadGroups } from '../actions/groups.actions';
import {
  changeLoadNotifications,
  loadNotifications,
} from '../actions/notifications.actions';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions) {}

  loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotifications),
      map(() =>
        changeLoadNotifications({
          notifications: [
            {
              _id: '1',
              expiresIn: '22.01.2022',
              text: 'Test case',
            },
          ],
        })
      )
    )
  );

  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroups),
      map(() =>
        changeLoadGroups({
          groups: [
            {
              name: 'Test User',
            },
          ],
        })
      )
    )
  );
}
