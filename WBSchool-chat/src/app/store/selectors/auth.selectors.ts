import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserData } from '../../../interfaces/auth-interface';
import { authNode, IAuthState } from '../reducers/auth.reducers';

export const selectAuthFeature = createFeatureSelector<IAuthState>(authNode);

export const selectUser = createSelector(
    selectAuthFeature,
    (state: IAuthState): IUserData => state.newUser
)