import { createReducer, on } from '@ngrx/store';
import { changeLoadNotifications, removeNotification } from '../actions/notifications.actions';

export const notificationNode = 'Notifications';

export interface INotificationsState {
  notifications: INotification[];
}
export interface INotification {
  _id: string;
  expiresIn: string;
  text: string;
}

const initialState: INotificationsState = {
  notifications: [
    {
      _id: '123',
      expiresIn: 'string',
      text: 'string'
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
);
