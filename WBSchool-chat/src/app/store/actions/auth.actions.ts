import { createAction, props } from '@ngrx/store';
import { IAuth, ISuccessAuth } from '../reducers/auth.reducers';

export const initAuth = createAction(
  '[AUTH] initAuth',
  props<{ user: IAuth }>()
);
export const initSuccessUser = createAction(
  '[AUTH] initSuccessUser',
  props<{ successUser: ISuccessAuth }>()
);
