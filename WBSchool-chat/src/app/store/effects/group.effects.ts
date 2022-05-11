import { IUser } from '../../../interfaces/user.groups-interface';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { newGetInfoChat } from '../actions/dialog.action';

import {
  changeLoadGroups,
  chatGroupError,
  editGroup,
  editToGroups,
  getGroupUsers,
  createChatGroup,
  loadGroups,
  pushToGroups,
  setGroupUsers,
  deleteGroup,
  deleteFromGroups,
  exitFromGroup,
} from '../actions/groups.actions';
import { catchError, map, mergeMap, of, tap, switchMap } from 'rxjs';

import { IChatInfo } from '../../../interfaces/dialog-interface';
import { IGroup } from '../../../interfaces/group-interface';

@Injectable()
export class GroupEffects {
  private urlApi = `${this.apiUrl}/api`;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    @Inject('API_URL') public apiUrl: string
  ) {}

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
        this.http.post<IGroup>(`${this.urlApi}/chats/groups`, group).pipe(
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
        this.http
          .patch<IGroup>(`${this.urlApi}/chats/groups/${id}`, editGroup)
          .pipe(
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
          .delete(`${this.urlApi}/chats/groups/${id}`)
          .pipe(map(() => deleteFromGroups({ id })))
      )
    );
  });

  getGroupUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getGroupUsers),
      mergeMap(({ id }) =>
        this.http
          .get<IUser[]>(`${this.urlApi}/chats/groups/${id}/users`)
          .pipe(map((users) => setGroupUsers({ users })))
      )
    );
  });

  exitFromGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exitFromGroup),
      mergeMap(({ id, owner }) => {
        const newOwner: any = {};

        if (owner) {
          newOwner.owner = owner;
        }

        return this.http
          .patch<IGroup>(`${this.urlApi}/chats/groups/${id}/exit`, newOwner)
          .pipe(map(() => deleteFromGroups({ id })));
      })
    );
  });
}
