import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authNode, IAuth, IAuthState, ISuccessAuth } from '../reducers/auth.reducers';

export const selectAuthFeature = createFeatureSelector<IAuthState>(authNode);

export const selectUser = createSelector(
    selectAuthFeature,
    (state: IAuthState): IAuth => state.user
)
export const selectSuccessUser = createSelector(
    selectAuthFeature,
    (state: IAuthState): ISuccessAuth => state.successUser
)