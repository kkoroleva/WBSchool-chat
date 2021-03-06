import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  changeLoadFriends,
  chatGroupError,
  createChatFriend,
  deleteChatFriend,
  loadFriends,
  pushToFriends,
  updateChatFriends,
  outFromChatFriend,
  returnIntoChatFriend,
} from '../actions/groups.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { IPrivate } from '../../../interfaces/private-interface';

@Injectable()
export class ChatsEffects {
  private urlApi = `${this.apiUrl}/api`;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    @Inject('API_URL') public apiUrl: string
  ) {}

  loadChats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFriends),
      mergeMap(() =>
        this.http.get<IPrivate[]>(`${this.urlApi}/chats/privates`).pipe(
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
          .post<IPrivate>(
            `${this.urlApi}/chats/privates?username=${username}`,
            {
              ownerUsername,
              ownerFormatImage,
              ownerAvatar,
            }
          )
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
      mergeMap(({ chatId, users }) =>
        this.http
          .patch<string>(`${this.urlApi}/chats/privates/${chatId}`, { users })
          .pipe(
            map((id) => updateChatFriends({ chatId: id })),
            catchError((err) =>
              of(chatGroupError({ error: err.error.message }))
            )
          )
      )
    );
  });

  outFromChat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(outFromChatFriend),
      mergeMap(({ chatId }) =>
        this.http
          .patch<string>(`${this.urlApi}/chats/privates/${chatId}/exit`, {})
          .pipe(map((id) => updateChatFriends({ chatId: id })))
      )
    );
  });
}
