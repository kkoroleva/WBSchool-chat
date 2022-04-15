import { createFeatureSelector, createSelector } from '@ngrx/store';
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
