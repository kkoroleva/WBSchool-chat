import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of, tap, throwError } from 'rxjs';
import { deleteMessage, editMessage, initDialogs, loadDialogs, newEditMessage, pushToMessages, removeMessage, sendMessage, usersData, usersDataResponse } from '../actions/dialog.action';
import { changeLoadFriends, changeLoadGroups, changeLoadUnreads, chatGroupError, createChatGroup, loadFriends, loadGroups, loadUnreads, pushToGroups } from '../actions/groups.actions';

import {
  changeLoadNotifications,
  clearNotifications,
  loadNotifications,
  removeNotification,
} from '../actions/notifications.actions';
import { IMessage } from 'src/app/dialog/dialog';
import { IGroup } from '../reducers/groups.reducers';
import { INotification } from '../reducers/notifications.reducers';
import { IFriend } from 'src/app/friends/friend';
import { IUnread } from 'src/app/unread/unread';
import { DialogService } from 'src/app/dialog/dialog.service';
import { User } from 'src/app/dialog/dialog';
import { select, Store } from '@ngrx/store';
import { selectDialog } from '../selectors/dialog.selector';

@Injectable()
export class AppEffects {
  private apiUrl = 'https://wbschool-chat.ru/api';
  public getGroups: IGroup[] = [];
  private chatId = '';

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private dialogService:DialogService,
    private router: Router, 
    private store$: Store
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
          map(( group ) => pushToGroups({ group })),
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

  // Dialog
  loadDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initDialogs),
      mergeMap(({id}) => this.http.get<IMessage[]>(`${this.apiUrl}/chats/${id}/messages`).pipe(
        map(( messages ) => loadDialogs({messages}) )
      ))
    )
  });

  pushToMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendMessage),
      mergeMap(( {message, id}) => this.http.post<IMessage>(`${this.apiUrl}/chats/${id}/messages`, message).pipe(
        map(( message ) => pushToMessages({ message }) )
      ))
    )
  })

  deleteMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeMessage),
      mergeMap(( { id, chatId }) => this.http.delete<string>(`${this.apiUrl}/chats/${chatId}/messages/${id}`).pipe(
        map(( id ) => deleteMessage({ id: id }) )
      ))
    )
  })

  editMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newEditMessage),
      mergeMap(( {text, id, chatId}) => this.dialogService.editMessage(text, id, chatId).pipe(
        map(( message ) => editMessage({ message }) )
      ))
    )
  })

  usersData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadDialogs), 
      tap(()=>{
        this.store$.pipe(
          select(
            selectDialog
          )
        ).subscribe((data)=>{
           this.chatId = data[0].chatId!
        }
        )
      }),
      mergeMap(( )=> this.http.get<User[]>(`${this.apiUrl}/chats/${this.chatId}/users`).pipe(
        map(( usersData ) => usersDataResponse({ usersData }))
      ))
    )
  })
}
