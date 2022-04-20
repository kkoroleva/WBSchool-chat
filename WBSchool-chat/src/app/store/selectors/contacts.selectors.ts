import { createFeatureSelector, createSelector } from '@ngrx/store';
import { contactsNode, IContacts } from '../reducers/contacts.reducers';

export const selectContactsFeature =
  createFeatureSelector<IContacts>(contactsNode);

export const selectContacts = createSelector(
  selectContactsFeature,
  (state: IContacts): IContacts => state
);
