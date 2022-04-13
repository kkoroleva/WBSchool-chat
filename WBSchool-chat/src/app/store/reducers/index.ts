import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import {
  INotifications,
  notificationNode,
  notificationsReducer,
} from './notifications.reducers';

export interface State {
  [notificationNode]: INotifications;
}

export const reducers: ActionReducerMap<State> = {
  [notificationNode]: notificationsReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
