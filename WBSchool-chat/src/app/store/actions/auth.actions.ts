import { createAction, props } from '@ngrx/store';
import { IUserData } from 'src/app/auth/interfaces';

export const initAuth = createAction(
  '[AUTH] initAuth',
  props<{ newUser: IUserData }>());
