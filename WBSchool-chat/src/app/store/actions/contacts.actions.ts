import { createAction, props } from '@ngrx/store';
import { IContacts } from '../reducers/contacts.reducers';

export const initContacts = createAction(
  '[CONTACTS] initContacts');

  export const pushContacts = createAction(
    '[CONTACTS] pushContacts',
    props<{ contacts: IContacts }>());