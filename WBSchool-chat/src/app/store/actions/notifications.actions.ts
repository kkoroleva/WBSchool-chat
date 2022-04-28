import { createAction, props } from '@ngrx/store';
import { INotification, IPostNotification } from '../reducers/notifications.reducers';

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

export const addAuthNotification = createAction(
  '[NOTIFICATIONS] addAuthNotification',
  props<{ notification: IPostNotification }>()
)

export const pushToNotification = createAction(
  '[NOTIFICATIONS] pushToNotification',
  props<{ notification: INotification }>()
)
