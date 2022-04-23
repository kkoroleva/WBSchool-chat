import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of, throwError} from 'rxjs';
import {
  deleteMessage,
  editMessage,
  emptyMessage,
  initDialogs,
  loadDialogs,
  newEditMessage,
  pushToMessages,
  removeMessage,
  sendMessage
} from '../actions/dialog.action';
import {
  changeLoadFriends,
  changeLoadGroups,
  changeLoadUnreads,
  chatGroupError,
  createChatGroup,
  loadFriends,
  loadGroups,
  loadUnreads,
  pushToGroups
} from '../actions/groups.actions';

import {
  changeLoadNotifications,
  clearNotifications,
  loadNotifications,
  removeNotification,
} from '../actions/notifications.actions';
import {IMessage} from 'src/app/dialog/dialog';
import {IGroup} from '../reducers/groups.reducers';
import {INotification} from '../reducers/notifications.reducers';
import {IFriend} from 'src/app/friends/friend';
import {IUnread} from 'src/app/unread/unread';
import {DialogService} from 'src/app/dialog/dialog.service';

@Injectable()
export class AppEffects {
  private urlApi = `${this.apiUrl}/api`;
  public getGroups: IGroup[] = [];

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private dialogService: DialogService,
    @Inject('API_URL') readonly apiUrl: string
  ) {
  }

  // Notifications
  loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotifications),
      mergeMap(() =>
        this.http
          .get<INotification[]>(`${this.urlApi}/users/notifications`)
          .pipe(
            map((notifications) => changeLoadNotifications({notifications}))
          )
      )
    )
  );

  removeNotification$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeNotification),
      mergeMap(({id}) =>
        this.http
          .delete<string>(`${this.urlApi}/users/notifications/${id}`)
          .pipe(
            map((id) => removeNotification({id})),
            catchError((err: HttpErrorResponse) => {
              if (err.status === 400 || err.status === 404) {
                map(() => removeNotification({id: '0'}));
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
            map((notifications) => changeLoadNotifications({notifications}))
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
          .pipe(map((groups) => changeLoadGroups({groups: groups.reverse()})))
      )
    );
  });

  createGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createChatGroup),
      mergeMap(({group}) =>
        this.http.post<IGroup>(`${this.urlApi}/chats`, group).pipe(
          map((group) => pushToGroups({group})),

          catchError((err) => of(chatGroupError({error: err.error.message})))
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
            map((friends) => changeLoadFriends({friends: friends.reverse()}))
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
            map((unreads) => changeLoadUnreads({unreads: unreads.reverse()}))
          )
      )
    );
  });

  // Dialog
  loadDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initDialogs),
      mergeMap(({id}) => this.http.get<IMessage[]>(`${this.urlApi}/chats/${id}/messages`).pipe(
        map((messages) => loadDialogs({messages}))
      ))
    )
  });

  pushToMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendMessage),
      mergeMap(({message, id}) => this.http.post<IMessage>(`${this.urlApi}/chats/${id}/messages`, message).pipe(map(
        (message) => emptyMessage()))
      )
    )
  })

  deleteMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeMessage),
      mergeMap(({id, chatId}) => this.http.delete<string>(`${this.urlApi}/chats/${chatId}/messages/${id}`).pipe(
        map((id) => deleteMessage({id: id}))
      ))
    )
  })

  editMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newEditMessage),
      mergeMap(({text, id, chatId}) => this.dialogService.editMessage(text, id, chatId).pipe(
        map((message) => editMessage({message}))
      ))
    )
  })
}
