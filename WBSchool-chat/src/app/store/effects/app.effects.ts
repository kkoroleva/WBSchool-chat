import { IUser } from './../../groups/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  allChatsMessages,
  getAllChatsMessages,
  getInfoChat,
  initDialogs,
  loadDialogs,
  newGetInfoChat,
} from '../actions/dialog.action';

import {
  changeLoadFriends,
  changeLoadGroups,
  chatGroupError,
  createChatFriend,
  editGroup,
  editToGroups,
  getGroupUsers,
  deleteChatFriend,
  loadFriends,
  pushToFriends,
  updateChatFriends,
  createChatGroup,
  loadGroups,
  pushToGroups,
  setGroupUsers,
  deleteGroup,
  deleteFromGroups,
  getAllGroupsMessages,
  allGroupsMessages,
  outFromChatFriend,
  returnIntoChatFriend,
} from '../actions/groups.actions';
import {
  catchError,
  map,
  mergeMap,
  throwError,
  of,
  tap,
  switchMap,
} from 'rxjs';

import {
  changeLoadNotifications,
  loadNotifications,
} from '../actions/notifications.actions';

import { IMessage } from './../../dialog/dialog';
import { INotification } from '../reducers/notifications.reducers';
import { IPrivate } from './../../friends/private';
import { DialogService } from './../../dialog/dialog.service';
import { IContacts } from '../reducers/contacts.reducers';
import { IGroup } from './../../groups/group';
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
    @Inject('API_URL') public apiUrl: string
  ) {}

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

  // Groups
  loadGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadGroups),
      mergeMap(() =>
        this.http.get<IGroup[]>(`${this.urlApi}/chats/groups`).pipe(
          tap((groups) =>
            groups.forEach((group) => {
              group.avatar = group.formatImage! + group.avatar;
            })
          ),
          map((groups) => changeLoadGroups({ groups: groups.reverse() }))
        )
      )
    );
  });

  createGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createChatGroup),
      mergeMap(({ group }) =>
        this.http.post<IGroup>(`${this.urlApi}/chats`, group).pipe(
          tap((group) => (group.avatar = group.formatImage! + group.avatar)),
          map((group) => pushToGroups({ group })),
          catchError((err) => of(chatGroupError({ error: err.error.message })))
        )
      )
    );
  });

  editGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editGroup),
      mergeMap(({ id, editGroup }) =>
        this.http.patch<IGroup>(`${this.urlApi}/chats/${id}`, editGroup).pipe(
          tap((group) => (group.avatar = group.formatImage! + group.avatar)),
          switchMap((group) => [
            newGetInfoChat({ chatInfo: group as IChatInfo }),
            editToGroups({ group }),
          ])
        )
      )
    );
  });

  deleteGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteGroup),
      mergeMap(({ id }) =>
        this.http
          .delete(`${this.urlApi}/chats/${id}`)
          .pipe(map(() => deleteFromGroups({ id })))
      )
    );
  });

  getGroupUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getGroupUsers),
      mergeMap(({ id }) =>
        this.http
          .get<IUser[]>(`${this.urlApi}/chats/${id}/users`)
          .pipe(map((users) => setGroupUsers({ users })))
      )
    );
  });

  // Chats
  loadChats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFriends),
      mergeMap(() =>
        this.http.get<IPrivate[]>(`${this.urlApi}/chats/friends`).pipe(
          tap((friends) =>
            friends.forEach((friend) => {
              friend.avatar = friend.formatImage! + friend.avatar;
            })
          ),
          map((friends) => changeLoadFriends({ friends: friends.reverse() }))
        )
      )
    );
  });

  createChat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createChatFriend),
      mergeMap(({ username, ownerUsername, ownerFormatImage, ownerAvatar }) =>
        this.http
          .post<IPrivate>(`${this.urlApi}/chats/private?username=${username}`, {
            ownerUsername,
            ownerFormatImage,
            ownerAvatar,
          })
          .pipe(
            tap(
              (friend) => (friend.avatar = friend.formatImage! + friend.avatar)
            ),
            map((friend) => pushToFriends({ friend })),
            catchError((err) =>
              of(chatGroupError({ error: err.error.message }))
            )
          )
      )
    );
  });

  returnIntoChat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(returnIntoChatFriend),
      mergeMap(({chatId, users}) =>
        this.http
          .patch<string>(`${this.urlApi}/chats/${chatId}`, {users})
          .pipe(map((id) => updateChatFriends({chatId: id})),
            catchError((err) =>
              of(chatGroupError({error: err.error.message}))
            ))
      )
    );
  });

  deleteChat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteChatFriend),
      mergeMap(({ chatId }) =>
        this.http
          .delete<string>(`${this.urlApi}/chats/${chatId}`)
          .pipe(map((id) => updateChatFriends({ chatId: id })))
      )
    );
  });

  outFromChat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(outFromChatFriend),
      mergeMap(({ chatId, owner }) =>
        this.http
          .patch<string>(`${this.urlApi}/chats/${chatId}/exit`, owner)
          .pipe(map((id) => updateChatFriends({chatId: id})))
      )
    );
  });

  // Contacts
  loadContacts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initContacts),
      mergeMap(() =>
        this.http.get<IContacts>(`${this.urlApi}/users/contacts`).pipe(
          map((contacts) => pushContacts({ contacts: contacts })),
          catchError((error: HttpErrorResponse, contacts: any) => {
            contacts = [];
            return throwError(() => error);
          })
        )
      )
    );
  });

  // Dialog
  loadDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initDialogs),
      mergeMap(({ id }) =>
        this.http
          .get<IMessage[]>(`${this.urlApi}/chats/${id}/messages`)
          .pipe(map((messages) => loadDialogs({ messages })))
      )
    );
  });

  loadAllChatsMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllChatsMessages),
      mergeMap(({ chatId }) =>
        this.http
          .get<IMessage[]>(`${this.urlApi}/chats/${chatId}/messages`)
          .pipe(
            map((messages) =>
              allChatsMessages({
                chatId: chatId,
                lastMessage: !!messages[messages.length - 1]
                  ? messages[messages.length - 1].text
                  : '',
              })
            )
          )
      )
    );
  });

  loadAllGroupsMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllGroupsMessages),
      mergeMap(({ chatId }) =>
        this.http
          .get<IMessage[]>(`${this.urlApi}/chats/${chatId}/messages`)
          .pipe(
            map((messages) =>
              allGroupsMessages({
                chatId: chatId,
                lastMessage: !!messages[messages.length - 1]
                  ? messages[messages.length - 1].text
                  : 'No messages yet',
                messageId: !!messages[messages.length - 1]
                  ? messages[messages.length - 1]._id!
                  : '',
              })
            )
          )
      )
    );
  });

  getInfoChats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getInfoChat),
      mergeMap(({ chatId }) =>
        this.http.get<IChatInfo>(`${this.urlApi}/chats/${chatId}`).pipe(
          tap(
            (chatInfo) =>
              (chatInfo.avatar = chatInfo.formatImage! + chatInfo.avatar)
          ),
          map((chatInfo) => newGetInfoChat({ chatInfo }))
        )
      )
    );
  });
}

