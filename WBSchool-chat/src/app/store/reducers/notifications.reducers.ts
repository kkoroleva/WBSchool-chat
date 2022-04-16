import { createReducer, on } from '@ngrx/store';
import { changeLoadNotifications, clearNotifications, loadNotifications, removeNotifications } from '../actions/notifications.actions';

export const notificationNode = 'notifications';

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
      _id: '0',
      expiresIn: '22.01.2022',
      text: 'initialState case',
    },
  ],
};

export const notificationsReducer = createReducer(
  initialState,
    on(loadNotifications, (state) => ({
      ...state,
      notifications: state.notifications
    })),
    on(changeLoadNotifications, (state, action) => ({
      ...state,
      notifications: action.notifications
    })),
    // on(remove, (state, action) => ({
    //   ...state,
    //   notifications: state.notifications.filter(
    //     (notification) => notification._id !== action.payload),
    // })),
  on(clearNotifications, (state) => ({
    ...state,
    notifications: [],
  }))
);
