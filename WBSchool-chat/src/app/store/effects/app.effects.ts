import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap, throwError } from 'rxjs';
import { errorMessage, initAuth, initSuccessUser } from '../actions/auth.actions';
import { changeLoadGroups, createChatGroup, loadGroups, pushToGroups } from '../actions/groups.actions';
import {
  changeLoadNotifications,
  clearNotifications,
  loadNotifications,
  removeNotification,
} from '../actions/notifications.actions';
import { ISuccessAuth } from '../reducers/auth.reducers';
import { IGroup } from '../reducers/groups.reducers';
import { INotification } from '../reducers/notifications.reducers';

@Injectable()
export class AppEffects {
  private apiUrl = 'https://wbschool-chat.ru/api';
  public getGroups: IGroup[] = [];

  constructor(private actions$: Actions, private http: HttpClient, private router: Router,) {}

  // Notifications
  loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotifications),
      mergeMap(() => this.http.get<INotification[]>(`${this.apiUrl}/users/notifications`).pipe(
        map(notifications => changeLoadNotifications({notifications}))
      )
      )
    )
  );

  removeNotification$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeNotification),
      mergeMap(({ id }) => this.http.delete<string>(`${this.apiUrl}/users/notifications/${id}`).pipe(
        map(id =>  removeNotification( {id} )),
        catchError((err: HttpErrorResponse) => {
          if ((err.status === 400) || (err.status === 404)) {
            map(() => removeNotification( {id: '0'} ))
          }
          return throwError(() => err)
        })
      )
      )
    )
  });

  clearNotification$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clearNotifications),
      mergeMap(() => this.http.delete<INotification[]>(`${this.apiUrl}/users/notifications/clear`).pipe(
        map(notifications => changeLoadNotifications({notifications}))
      )
      )
    )
  });

  // Groups
  loadGroups$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(loadGroups),
        mergeMap(() => this.http.get<IGroup[]>(`${this.apiUrl}/chats/groups`).pipe(
          map(groups => changeLoadGroups({groups}))
        )
        )
      )
    }
  );

  createGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createChatGroup),
      mergeMap(({ group }) => this.http.post<IGroup>(`${this.apiUrl}/chats`, group).pipe(
        map((group) =>  pushToGroups( {group} ))
      )
      )
    )
  });

  // Auth
  initAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initAuth),
      mergeMap(({ user }) => {
        return this.http.post<ISuccessAuth>(`${this.apiUrl}/signin`, user).pipe(
        tap((successUser) => {
          localStorage.setItem('token', successUser.token)
        }),
        map((successUser) => initSuccessUser( {successUser} )),
        catchError(
          error => of(errorMessage({
              errorMessage: error.error.message
            }))
        )
      )
    })
    )
  })
}
