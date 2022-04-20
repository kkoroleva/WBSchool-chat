import { createAction, props } from '@ngrx/store';

export const initContacts = createAction(
  '[CONTACTS] initContacts',
  props<{ contacts: any[] }>());