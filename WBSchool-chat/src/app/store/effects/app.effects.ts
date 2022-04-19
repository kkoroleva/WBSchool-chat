import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  changeLoadFriends,
  changeLoadUnreads,
  chatGroupError,
  loadFriends,
  loadUnreads,
} from '../actions/groups.actions';
import { catchError, map, mergeMap, throwError, of } from 'rxjs';
import {
  changeLoadGroups,
  createChatGroup,
  loadGroups,
  pushToGroups,
} from '../actions/groups.actions';
import {
  changeLoadNotifications,
  clearNotifications,
  loadNotifications,
  removeNotification,
} from '../actions/notifications.actions';
import { IGroup } from '../reducers/groups.reducers';
import { INotification } from '../reducers/notifications.reducers';
import { IFriend } from 'src/app/friends/friend';
import { IUnread } from 'src/app/unread/unread';

@Injectable()
export class AppEffects {
  private apiUrl = 'https://wbschool-chat.ru/api';
  public getGroups: IGroup[] = [];

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  // Notifications
  loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotifications),
      mergeMap(() =>
        this.http
          .get<INotification[]>(`${this.apiUrl}/users/notifications`)
          .pipe(
            map((notifications) => changeLoadNotifications({ notifications }))
          )
      )
    )
  );

  removeNotification$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeNotification),
      mergeMap(({ id }) =>
        this.http
          .delete<string>(`${this.apiUrl}/users/notifications/${id}`)
          .pipe(
            map((id) => removeNotification({ id })),
            catchError((err: HttpErrorResponse) => {
              if (err.status === 400 || err.status === 404) {
                map(() => removeNotification({ id: '0' }));
              }
              return throwError(() => err);
            })
          )
      )
    );
  });

  clearNotification$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clearNotifications),
      mergeMap(() =>
        this.http
          .delete<INotification[]>(`${this.apiUrl}/users/notifications/clear`)
          .pipe(
            map((notifications) => changeLoadNotifications({ notifications }))
          )
      )
    );
  });

  // Groups
  loadGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadGroups),
      mergeMap(() =>
        this.http
          .get<IGroup[]>(`${this.apiUrl}/chats/groups`)
          .pipe(map((groups) => changeLoadGroups({ groups: groups.reverse() })))
      )
    );
  });

  createGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createChatGroup),
      mergeMap(({ group }) =>
        this.http.post<IGroup>(`${this.apiUrl}/chats`, group).pipe(
          map(() => pushToGroups({ group })),
          catchError((err) => of(chatGroupError({ error: err.error.message })))
        )
      )
    );
  });

  loadFriends$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFriends),
      mergeMap(() =>
        this.http
          .get<IFriend[]>(`${this.apiUrl}/chats/friends`)
          .pipe(
            map((friends) => changeLoadFriends({ friends: friends.reverse() }))
          )
      )
    );
  });

  loadUnreads$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUnreads),
      mergeMap(() =>
        this.http
          .get<IUnread[]>(`${this.apiUrl}/chats`)
          .pipe(
            map((unreads) => changeLoadUnreads({ unreads: unreads.reverse() }))
          )
      )
    );
  });
}
