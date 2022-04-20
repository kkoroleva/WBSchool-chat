import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  contactsNode,
  IContact,
  IContactsState,
} from '../reducers/contacts.reducers';

export const selectContactsFeature =
  createFeatureSelector<IContactsState>(contactsNode);

export const selectContacts = createSelector(
  selectContactsFeature,
  (state: IContactsState): IContactsState => state
);

export const selectContactsArr = createSelector(
  selectContactsFeature,
  (state: IContactsState): IContact[] => state.contacts
);
