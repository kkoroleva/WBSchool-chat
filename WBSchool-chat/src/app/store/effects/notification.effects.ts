import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  map,
  mergeMap,
} from 'rxjs';

import {
  changeLoadNotifications,
  loadNotifications,
} from '../actions/notifications.actions';
import { INotification } from '../../../interfaces/notifications-interface';

@Injectable()
export class NotificationEffects {
  private urlApi = `${this.apiUrl}/api`;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    @Inject('API_URL') public apiUrl: string
  ) {}

  loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotifications),
      mergeMap(() =>
        this.http
          .get<INotification[]>(`${this.urlApi}/users/notifications`)
          .pipe(
            map((notifications) => changeLoadNotifications({ notifications }))
          )
      )
    )
  );
}