import { createReducer, on } from '@ngrx/store';
import { IUserData } from 'src/app/auth/interfaces';
import { addContact, initContacts } from '../actions/contacts.actions';

export const contactsNode = 'Contacts';

export interface IContacts {
  id: string;
  contacts: IUser[];
}

export interface IUser {
  _id?: string;
  avatar?: string;
  username: string;
}

const initialState: IContacts = {
  id: '',
  contacts: [],
};

export const contactsReducer = createReducer(
  initialState,
  on(initContacts, (state) => ({
    ...state,
    initialState: state,
  })),
  on(addContact, (state, action) => ({
    ...state,
    contact: [...state.contacts, action.contact],
  }))
);
