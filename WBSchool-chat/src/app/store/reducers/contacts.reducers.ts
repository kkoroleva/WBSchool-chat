import { createReducer, on } from '@ngrx/store';
import { IUserData } from 'src/app/auth/interfaces';
import { addContact, initContacts } from '../actions/contacts.actions';

export const contactsNode = 'Contacts';

export interface IContacts {
  id: string;
  contacts: IUserData[]
}

const initialState: IContacts = {
  id: '',
  contacts: [{
    email: '',
    username: '',
    userRights: '',
    avatar: '',
    about: '',
    id: '',
    v: 0
  }]
};

export const contactsReducer = createReducer(
  initialState,
  on(initContacts, (state) => ({
    ...state,
    initialState: state
  })),
  on(addContact, (state, action) => ({
    ...state,
    contact: [...state.contacts, action.contact]
  }))
);
