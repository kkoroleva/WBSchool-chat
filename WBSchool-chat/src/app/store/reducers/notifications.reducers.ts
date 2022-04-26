import { createReducer, on } from '@ngrx/store';
import { addAuthNotification, changeLoadNotifications, pushToNotification, removeNotification } from '../actions/notifications.actions';

export const notificationNode = 'Notifications';

export interface INotificationsState {
  notifications: INotification[];
}
export interface INotification {
  _id: string;
  expiresIn: string;
  text: string;
}

export interface IPostNotification {
  text: string
}

const initialState: INotificationsState = {
  notifications: [
    {
      _id: '',
      expiresIn: '',
      text: ''
    }
  ],
};

export const notificationsReducer = createReducer(
  initialState,
  on(changeLoadNotifications, (state, action) => ({
    ...state,
    notifications: action.notifications
  })),
  on(removeNotification, (state, action) => ({
    ...state,
    notifications: state.notifications.filter(
      (notification) => notification._id !== action.id),
  })),
  on(pushToNotification, (state, action) => ({
    ...state,
    notifications: [action.notification, ...state.notifications]
  }))
);
