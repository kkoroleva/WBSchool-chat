import { createFeatureSelector, createSelector } from '@ngrx/store';
import { contactsNode, IContacts } from '../reducers/contacts.reducers';

export const selectContactsFeature =
  createFeatureSelector<IContacts>(contactsNode);

export const selectContacts = createSelector(
  selectContactsFeature,
  (state: IContacts): IContacts => state
);

// export const selectContactsArr = createSelector(
//   selectContactsFeature,
//   (state: IContactsState): IContact[] => state.contacts
// );
