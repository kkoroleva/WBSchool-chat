import { createReducer, on } from '@ngrx/store';
import { IUserData } from './../../auth/interfaces';
import { initAuth } from '../actions/auth.actions';

export const authNode = 'Auth';

export interface IAuthState {
  newUser: IUserData;
}
export interface IAuth {
    emailOrUser?: string
    email?: string,
    username?: string,
    password: string,
}

const initialState: IAuthState = {
  newUser: {
      email: '',
      username: '',
      userRights: '',
      avatar: '',
      about: '',
      _id: '',
      v: 0
    }
};

export const authReducer = createReducer(
  initialState,
  on(initAuth, (state, action) => ({
    ...state,
    newUser: action.newUser
  }))
);
