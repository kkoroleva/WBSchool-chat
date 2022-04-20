import { createReducer, on } from '@ngrx/store';
import { IUserData } from 'src/app/auth/interfaces';
import {
  addContact,
  initContacts,
  pushContacts,
} from '../actions/contacts.actions';

export const contactsNode = 'Contacts';

export interface IContactsState {
  id: string;
  contacts: IContact[];
}

export interface IContacts {
  id: string;
  contacts: IUserData[];
}

export interface IContact {
  _id?: string;
  avatar?: string;
  username: string;
}

const initialState: IContactsState = {
  id: '',
  contacts: [],
};

export const contactsReducer = createReducer(
  initialState,
  on(initContacts, (state) => ({
    ...state,
  })),
  on(addContact, (state, action) => ({
    ...state,
    contact: [...state.contacts, action.contact],
  })),
  on(pushContacts, (state, action) => ({
    ...state,
    contacts: action.contacts.contacts,
  }))
);
