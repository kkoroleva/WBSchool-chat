import { createReducer, on } from '@ngrx/store';
import { initContacts } from '../actions/contacts.actions';

export const contactsNode = 'Contacts';

const initialState: any[] = [{
    
}];

export const contactsReducer = createReducer(
  initialState,
  on(initContacts, (state, action) => ({
    ...state,
    contacts: action
  }))
);
