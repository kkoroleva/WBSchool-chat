import { HttpClient } from '@angular/common/http';
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
  getAllGroupsMessages,
  allGroupsMessages,
} from '../actions/groups.actions';
import {
  map,
  mergeMap,
  tap,
} from 'rxjs';

import { IChatInfo, IMessage } from '../../../interfaces/dialog-interface';

@Injectable()
export class DialogEffects {
  private urlApi = `${this.apiUrl}/api`;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    @Inject('API_URL') public apiUrl: string
  ) {}

  loadDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initDialogs),
      mergeMap(({ id, isPrivate }) =>
        this.http
          .get<IMessage[]>(`${this.urlApi}/chats/${isPrivate ? 'privates' : 'groups'}/${id}/messages`)
          .pipe(map((messages) => loadDialogs({ messages })))
      )
    );
  });

  loadAllChatsMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllChatsMessages),
      mergeMap(({ chatId }) =>
        this.http
          .get<IMessage[]>(`${this.urlApi}/chats/privates/${chatId}/messages`)
          .pipe(
            map((messages) =>
              allChatsMessages({
                chatId: chatId,
                lastMessage: messages[messages.length - 1] ?.text || 'No messages yet',
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
          .get<IMessage[]>(`${this.urlApi}/chats/groups/${chatId}/messages`)
          .pipe(
            map((messages) =>
              allGroupsMessages({
                chatId: chatId,
                lastMessage: messages[messages.length - 1]?.text || 'No messages yet',
                messageId: messages[messages.length - 1]?._id! || '',
              })
            )
          )
      )
    );
  });

  getInfoChats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getInfoChat),
      mergeMap(({ chatId, isPrivate }) => 
        this.http.get<IChatInfo>(`${this.urlApi}/chats/${isPrivate ? 'privates' : 'groups'}/${chatId}`).pipe(
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
