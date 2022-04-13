import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  INotification,
  notificationNode,
} from '../reducers/notifications.reducers';

export const selectNotificationsFeature =
  createFeatureSelector<INotification[]>(notificationNode);

export const selectNotifications = createSelector(
  selectNotificationsFeature,
  (state: INotification[]): INotification[] => state
);
