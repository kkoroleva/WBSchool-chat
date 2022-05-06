import { createAction, props } from '@ngrx/store';
import { IUserData } from '../../../interfaces/auth-interface';

export const initAuth = createAction(
  '[AUTH] initAuth',
  props<{ newUser: IUserData }>());