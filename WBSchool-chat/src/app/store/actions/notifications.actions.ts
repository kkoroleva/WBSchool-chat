import { createAction, props } from '@ngrx/store';
import { INotification } from '../reducers/notifications.reducers';

export const loadNotifications = createAction('[NOTIFICATIONS] loadNotifications');
export const changeLoadNotifications = createAction('[NOTIFICATIONS] changeLoadNotifications',
props<{ notifications: INotification[] }> ());

export const removeNotifications = createAction('[NOTIFICATIONS] removeNotifications');
export const clearNotifications = createAction('[NOTIFICATIONS] clearNotifications');
