import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  changeLoadGroups,
  chatGroupError,
  createChatGroup,
  loadGroups,
  pushToGroups,
} from '../actions/groups.actions';
import {
  changeLoadNotifications,
  loadNotifications,
} from '../actions/notifications.actions';
import { IGroup } from '../reducers/groups.reducers';

@Injectable()
export class AppEffects {
  private apiUrl = 'http://www.wbschool-chat.ru';
  public getGroups: IGroup[] = [];

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotifications),
      map(() =>
        changeLoadNotifications({
          notifications: [
            {
              _id: '1',
              expiresIn: '22.01.2022',
              text: 'Test case',
            },
          ],
        })
      )
    )
  );

  loadGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadGroups),
      mergeMap(() =>
        this.http
          .get<IGroup[]>(`${this.apiUrl}/chats/groups`)
          .pipe(map((groups) => changeLoadGroups({ groups })))
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
}

// loadMovies$ = createEffect(() => this.actions$.pipe(
//   ofType('[Movies Page] Load Movies'),
//   mergeMap(() => this.moviesService.getAll()
//     .pipe(
//       map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
//       catchError(() => EMPTY)
//     ))
//   )
// );

// loadGroups$ = createEffect(() => {
//   this.http.get<IGroup[]>(`${this.apiUrl}/chats/groups`).subscribe((groups) => {
//      this.getGroups = groups
//    }
//  )

//    return this.actions$.pipe(
//      ofType(loadGroups),
//      map(() =>
//        changeLoadGroups({
//          groups: this.getGroups
//        })
//      )
//    )
//  }
// );
