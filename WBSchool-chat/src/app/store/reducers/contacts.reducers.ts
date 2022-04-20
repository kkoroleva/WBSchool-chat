import { createReducer, on } from '@ngrx/store';
import { IUserData } from 'src/app/auth/interfaces';
import { initContacts, pushContacts } from '../actions/contacts.actions';

export const contactsNode = 'Contacts';

export interface IContacts {
  id: string;
  contacts: IUserData[];
}

const initialState: IContacts = {
  id: '',
  contacts: [],
};

export const contactsReducer = createReducer(
  initialState,
  on(initContacts, (state) => ({
    ...state,
  })),
  on(pushContacts, (state, action) => ({
    ...state,
    contacts: action.contacts.contacts,
  }))
);
