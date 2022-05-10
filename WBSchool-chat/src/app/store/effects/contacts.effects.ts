import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, throwError } from 'rxjs';

import { IContactsState } from '../reducers/contacts.reducers';
import { initContacts, pushContacts } from '../actions/contacts.actions';

@Injectable()
export class ContactsEffects {
  private urlApi = `${this.apiUrl}/api`;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    @Inject('API_URL') public apiUrl: string
  ) {}

  loadContacts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initContacts),
      mergeMap(() =>
        this.http.get<IContactsState>(`${this.urlApi}/users/contacts`).pipe(
          map((contacts) => pushContacts({ contacts: contacts })),
          catchError((error: HttpErrorResponse, contacts: any) => {
            contacts = [];
            return throwError(() => error);
          })
        )
      )
    );
  });
}
