import { createReducer, on } from '@ngrx/store';
import { IUserData } from '../../auth/interfaces';
import { initContacts, pushContacts } from '../actions/contacts.actions';

export const contactsNode = 'Contacts';

export interface IContacts {
  _id: string;
  contacts: IUserData[];
}

const initialState: IContacts = {
  _id: '',
  contacts: [
    {
      email: '',
      username: '',
      userRights: '',
      avatar: '',
      about: '',
      _id: '',
      v: 0,
    },
  ],
};

export const contactsReducer = createReducer(
  initialState,
  on(initContacts, (state) => ({
    ...state,
  })),
  on(pushContacts, (state, action) => ({
    ...state,
    _id: action.contacts._id,
    contacts: action.contacts.contacts,
  }))
);
