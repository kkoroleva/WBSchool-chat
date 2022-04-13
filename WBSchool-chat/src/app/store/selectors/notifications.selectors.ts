import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  INotifications,
  notificationNode,
} from '../reducers/notifications.reducers';

export const selectNotificationsFeature =
  createFeatureSelector<INotifications>(notificationNode);

export const selectNotifications = createSelector(
  selectNotificationsFeature,
  (state: INotifications): INotifications => state
);
