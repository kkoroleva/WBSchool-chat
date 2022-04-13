import { createReducer, on } from '@ngrx/store';
import { clear, load, remove } from '../actions/notifications.actions';

export const notificationNode = 'notifications';

export interface INotifications {
  notifications: INotificationState[];
}

export interface INotificationState {
  _id: string;
  expiresIn: string;
  text: string;
}

const initialState: INotifications = {
  notifications: [
    {
      _id: '0',
      expiresIn: '22.01.2022',
      text: 'test case',
    },
  ],
};

export const notificationsReducer = createReducer(
  initialState,
  //   on(load, (state, action) => ({
  //     ...state,
  //     notifications: state.notifications.concat(action.payload),
  //   })),
  //   on(remove, (state, action) => ({
  //     ...state,
  //     notifications: state.notifications.filter(
  //       (notification) => notification._id !== action.payload),
  //   })),
  on(clear, (state) => ({
    ...state,
    notifications: [],
  }))
);
