import { createAction, props } from '@ngrx/store';
import { INewUser } from 'src/app/auth/interfaces';

export const initAuth = createAction(
  '[AUTH] initAuth',
  props<{ newUser: INewUser }>());