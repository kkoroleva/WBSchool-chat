import { createFeatureSelector, createSelector } from '@ngrx/store';
import { INotification } from '../../../interfaces/notifications-interface';
import {
  INotificationsState,
  notificationNode,
} from '../reducers/notifications.reducers';

export const selectNotificationsFeature =
  createFeatureSelector<INotificationsState>(notificationNode);

export const selectNotifications = createSelector(
  selectNotificationsFeature,
  (state: INotificationsState): INotificationsState => state
);

export const selectElNotifications = createSelector(
  selectNotificationsFeature,
  (state: INotificationsState): INotification[] => state.notifications
)