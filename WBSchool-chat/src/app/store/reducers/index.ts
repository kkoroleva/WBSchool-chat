import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { authNode, authReducer, IAuthState } from './auth.reducers';
import { contactsNode, IContacts, contactsReducer } from './contacts.reducers';
import { allChatsMessagesReducer, dialogNode, dialogReducer, dialogsNode, IAllChatsMessages, IDialogState } from './dialog.reducer';
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
  [dialogsNode]: IAllChatsMessages;
}

export const reducers: ActionReducerMap<State> = {
  [notificationNode]: notificationsReducer,
  [groupsNode]: groupsReducer,
  [authNode]: authReducer,
  [dialogNode]: dialogReducer,
  [contactsNode]: contactsReducer,
  [dialogsNode]: allChatsMessagesReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
