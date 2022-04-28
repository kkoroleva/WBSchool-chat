import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { authNode, authReducer, IAuthState } from './auth.reducers';
import { contactsNode, IContacts, contactsReducer } from './contacts.reducers';
import { dialogNode, dialogReducer, IDialogState } from './dialog.reducer';
import { groupsNode, groupsReducer, IGroupsState } from './groups.reducers';
import {
  INotificationsState,
  notificationNode,
  notificationsReducer,
} from './notifications.reducers';

export interface State {
  [notificationNode]: INotificationsState;
  [groupsNode]: IGroupsState;
  [authNode]: IAuthState;
  [dialogNode]: IDialogState;
  [contactsNode]: IContacts;
}

export const reducers: ActionReducerMap<State> = {
  [notificationNode]: notificationsReducer,
  [groupsNode]: groupsReducer,
  [authNode]: authReducer,
  [dialogNode]: dialogReducer,
  [contactsNode]: contactsReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
