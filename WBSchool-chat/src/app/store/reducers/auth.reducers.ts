import { createReducer, on } from '@ngrx/store';
import { IUserData } from '../../../interfaces/auth-interface';
import { initAuth } from '../actions/auth.actions';

export const authNode = 'Auth';

export interface IAuthState {
  newUser: IUserData;
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
