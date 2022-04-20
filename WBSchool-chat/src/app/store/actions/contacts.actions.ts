import { createAction, props } from '@ngrx/store';
import { IUserData } from 'src/app/auth/interfaces';
import { IContacts } from '../reducers/contacts.reducers';

export const initContacts = createAction(
  '[CONTACTS] initContacts');

  export const addContact = createAction(
  '[CONTACTS] addContact',
  props<{ contact: IUserData }>());

  export const pushContacts = createAction(
    '[CONTACTS] pushContacts',
    props<{ contacts: IContacts }>());