import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, mergeMap } from 'rxjs';
import { IThread } from '../../../interfaces/thread-interface';
import { initThread, loadThread } from '../actions/threads.action';

@Injectable()
export class ThreadsEffects {
  private urlApi = `${this.apiUrl}/api`;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    @Inject('API_URL') public apiUrl: string
  ) {}

  getThread$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initThread),
      mergeMap(({ chatId, messageId }) =>
        this.http
          .get<IThread>(
            `${this.urlApi}/chats/${chatId}/messages/${messageId}/thread`
          )
          .pipe(map((thread) => loadThread({ thread })))
      )
    );
  });
}
