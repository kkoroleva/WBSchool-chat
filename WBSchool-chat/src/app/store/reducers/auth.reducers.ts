import { createReducer, on } from '@ngrx/store';
import { INewUser } from 'src/app/auth/interfaces';
import { initAuth } from '../actions/auth.actions';

export const authNode = 'Auth';

export interface IAuthState {
  newUser: INewUser;
}
export interface IAuth {
    emailOrUser?: string
    email?: string,
    username?: string,
    password: string,
}

const initialState: IAuthState = {
    newUser: {
        token: '',
            newUser: {
            email: '',
            username: '',
            userRights: '',
            avatar: '',
            about: '',
            id: '',
            v: 0
        }
    }
};

export const authReducer = createReducer(
  initialState,
  on(initAuth, (state, action) => ({
    ...state,
    newUser: action.newUser
  }))
);
