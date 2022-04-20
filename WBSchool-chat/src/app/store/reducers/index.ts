import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { authNode, authReducer, IAuthState } from './auth.reducers';
import { contactsNode, contactsReducer, IContacts } from './contacts.reducers';
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
  [contactsNode]: IContacts;
}

export const reducers: ActionReducerMap<State> = {
  [notificationNode]: notificationsReducer,
  [groupsNode]: groupsReducer,
  [authNode]: authReducer,
  [contactsNode]: contactsReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
