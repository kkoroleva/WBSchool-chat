import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import {
  INotification,
  notificationNode,
  notificationsReducer,
} from './notifications.reducers';

export interface State {
  [notificationNode]: INotification[];
}

export const reducers: ActionReducerMap<State> = {
  [notificationNode]: notificationsReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
