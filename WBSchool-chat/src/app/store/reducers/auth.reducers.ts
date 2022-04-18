import { createReducer, on } from '@ngrx/store';
import { initAuth, initSuccessUser } from '../actions/auth.actions';

export const authNode = 'Auth';

export interface IAuthState {
  user: IAuth;
  successUser: ISuccessAuth;
}
export interface IAuth {
    emailOrUser?: string
    email?: string,
    username?: string,
    password: string,
}
export interface ISuccessAuth {
    token: string,
    email: string,
    username: string,
    userRights: string,
    avatar: string,
    about: string,
    id: string,
    v: number
}

export interface Register {
    email: string,
    username: string
}

export interface Login {
    token: string
}

const initialState: IAuthState = {
    user: 
    {
        emailOrUser: '',
        email: '',
        username: '',
        password: ''
    },
    successUser: 
    {
        token: '',
        email: '',
        username: '',
        userRights: '',
        avatar: '',
        about: '',
        id: '',
        v: 0
    }
};

export const authReducer = createReducer(
  initialState,
  on(initAuth, (state, action) => ({
    ...state,
    user: action.user
  })),
  on(initSuccessUser, (state, action) => ({
      ...state,
      successUser: action.successUser
  }))
);
