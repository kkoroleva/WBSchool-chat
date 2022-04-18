import { createAction, props } from '@ngrx/store';
import { INotification } from '../reducers/notifications.reducers';

export const loadNotifications = createAction(
  '[NOTIFICATIONS] loadNotifications'
);
export const changeLoadNotifications = createAction(
  '[NOTIFICATIONS] changeLoadNotifications',
  props<{ notifications: INotification[] }>()
);

export const removeNotification = createAction(
  '[NOTIFICATIONS] removeNotifications',
  props<{ id: string }>()
);
export const clearNotifications = createAction(
  '[NOTIFICATIONS] clearNotifications'
);
