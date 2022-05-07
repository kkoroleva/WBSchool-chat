import { createAction, props } from '@ngrx/store';
import { IContactsState } from '../reducers/contacts.reducers';

export const initContacts = createAction('[CONTACTS] initContacts');

export const pushContacts = createAction(
  '[CONTACTS] pushContacts',
  props<{ contacts: IContactsState }>()
);
