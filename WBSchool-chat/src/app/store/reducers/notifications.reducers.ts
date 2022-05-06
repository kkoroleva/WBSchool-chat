import { createReducer, on } from '@ngrx/store';
import { INotification } from '../../../interfaces/notifications-interface';
import {
  changeLoadNotifications,
  clearNotifications,
  pushToNotification,
  removeNotification,
} from '../actions/notifications.actions';

export const notificationNode = 'Notifications';

export interface INotificationsState {
  notifications: INotification[];
}

const initialState: INotificationsState = {
  notifications: [],
};

export const notificationsReducer = createReducer(
  initialState,
  on(changeLoadNotifications, (state, action) => ({
    ...state,
    notifications: action.notifications,
  })),
  on(clearNotifications, (state) => ({
    ...state,
    notifications: [],
  })),
  on(removeNotification, (state, action) => ({
    ...state,
    notifications: state.notifications.filter((notification) => {
      return notification._id !== action.id;
    }),
  })),
  on(pushToNotification, (state, action) => ({
    ...state,
    notifications: [action.notification, ...state.notifications],
  }))
);
