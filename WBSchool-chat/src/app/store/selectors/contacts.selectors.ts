import { createFeatureSelector, createSelector } from '@ngrx/store';
import { contactsNode } from '../reducers/contacts.reducers';

export const selectContactsFeature = createFeatureSelector<any[]>(contactsNode);

export const selectContacts = createSelector(
    selectContactsFeature,
    (state: any[]): any[] => state
)