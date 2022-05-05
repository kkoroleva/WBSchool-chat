import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { authNode, authReducer, IAuthState } from './auth.reducers';
import {
  contactsNode,
  contactsReducer,
  IContactsState,
} from './contacts.reducers';

import {
  lastMessagesReducer,
  dialogNode,
  dialogReducer,
  lastMessagesNode,
  ILastMessagesState,
  IDialogState,
} from './dialog.reducer';
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
  [contactsNode]: IContactsState;
  [lastMessagesNode]: ILastMessagesState;
}

export const reducers: ActionReducerMap<State> = {
  [notificationNode]: notificationsReducer,
  [groupsNode]: groupsReducer,
  [authNode]: authReducer,
  [dialogNode]: dialogReducer,
  [contactsNode]: contactsReducer,
  [lastMessagesNode]: lastMessagesReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
