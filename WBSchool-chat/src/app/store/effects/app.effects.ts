import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  deleteMessage,
  editMessage,
  emptyMessage,
  getInfoChat,
  initDialogs,
  loadDialogs,
  newEditMessage,
  newGetInfoChat,
  pushToMessages,
  removeMessage,
  sendMessage
} from '../actions/dialog.action';
import {
  changeLoadFriends,
  changeLoadGroups,
  changeLoadUnreads,
  chatGroupError,
  createChatFriend,
  loadFriends,
  loadUnreads,
  pushToFriends,
  createChatGroup,
  loadGroups,
  pushToGroups
} from '../actions/groups.actions';
import { catchError, map, mergeMap, throwError, of, tap } from 'rxjs';

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
import { Router } from '@angular/router';
import { IContacts } from '../reducers/contacts.reducers';
import { initContacts, pushContacts } from '../actions/contacts.actions';
import { IChatInfo } from '../reducers/dialog.reducer';

@Injectable()
export class AppEffects {
  private urlApi = `${this.apiUrl}/api`;
  public getGroups: IGroup[] = [];

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    public dialogService: DialogService,
    private router: Router,
    @Inject('API_URL') public apiUrl: string
  ) { }

  // Notifications
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

  removeNotification$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeNotification),
      mergeMap(({ id }) =>
        this.http
          .delete<string>(`${this.urlApi}/users/notifications/${id}`)
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
          .delete<INotification[]>(`${this.urlApi}/users/notifications/clear`)
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
          .get<IGroup[]>(`${this.urlApi}/chats/groups`)
          .pipe(map((groups) => changeLoadGroups({ groups: groups.reverse() })))
      )
    );
  });

  createGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createChatGroup),
      mergeMap(({ group }) =>
        this.http.post<IGroup>(`${this.urlApi}/chats`, group).pipe(
          map((group) => pushToGroups({ group })),

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
          .get<IFriend[]>(`${this.urlApi}/chats/friends`)
          .pipe(
            map((friends) => changeLoadFriends({ friends: friends.reverse() }))
          )
      )
    );
  });

  createPrivate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createChatFriend),
      mergeMap(({ username }) =>
        this.http
          .post<IFriend>(
            `${this.urlApi}/chats/private?username=${username}`,
            {}
          )
          .pipe(
            map((friend) => pushToFriends({ friend })),
            catchError((err) =>
              of(chatGroupError({ error: err.error.message }))
            )
          )
      )
    );
  });

  loadUnreads$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUnreads),
      mergeMap(() =>
        this.http
          .get<IUnread[]>(`${this.urlApi}/chats`)
          .pipe(
            tap((unreads) => unreads.forEach(unread => {
              unread.avatar = unread.formatImage! + unread.avatar
            })),
            map((unreads) => changeLoadUnreads({ unreads: unreads.reverse() }))
          )
      )
    );
  });

  // Dialog
  loadDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initDialogs),
      mergeMap(({ id }) => this.http.get<IMessage[]>(`${this.urlApi}/chats/${id}/messages`).pipe(
        map((messages) => loadDialogs({ messages }))
      ))
    )
  });

  loadContacts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initContacts),
      mergeMap(() =>
        this.http.get<IContacts>(`${this.urlApi}/users/contacts`)
          .pipe(
            map((contacts) => pushContacts({ contacts: contacts })),
            catchError((error: HttpErrorResponse, contacts: any) => {
              contacts = [];
              return throwError(() => error)
            })
          )
      )
    );
  });

  getInfoChats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getInfoChat),
      mergeMap(({ chatId }) => this.http.get<IChatInfo>(`${this.urlApi}/chats/${chatId}
      `).pipe(
        map(
          (chatInfo) => newGetInfoChat({ chatInfo })))
      )
    )
  })
}
