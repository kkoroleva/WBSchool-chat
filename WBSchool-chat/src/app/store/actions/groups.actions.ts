import { createAction, props } from '@ngrx/store';
import { IGroup } from '../reducers/groups.reducers';

export const loadGroups = createAction('[GROUPS] loadGroups');
export const changeLoadGroups = createAction('[GROUPS] changeLoadGroups',
props<{ groups: IGroup[] }> ());
