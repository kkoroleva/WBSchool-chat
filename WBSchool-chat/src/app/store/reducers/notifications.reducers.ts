import { Action } from '@ngrx/store';
import { NotificationsActions, notificationsActionsType } from '../actions/notifications.actions';

export const notificationNode = 'notifications';

export interface INotification {
  expiresIn: string;
  text: string;
}

const initialState: INotification[] = [
  {
    expiresIn: '22.01.2022',
    text: 'test case 1',
  },
];

export const notificationsReducer = (
  state = initialState,
  action: Action
) => {
    switch (action.type) {
        case notificationsActionsType.load:
            return {
                ...state,
            };
        default: 
            return state;    
    }
};
