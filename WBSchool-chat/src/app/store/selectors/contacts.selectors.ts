import { createFeatureSelector, createSelector } from '@ngrx/store';
import { contactsNode, IContactsState } from '../reducers/contacts.reducers';

export const selectContactsFeature =
  createFeatureSelector<IContactsState>(contactsNode);

export const selectContacts = createSelector(
  selectContactsFeature,
  (state: IContactsState): IContactsState => state
);
