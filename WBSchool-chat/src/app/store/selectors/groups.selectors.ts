import { createFeatureSelector, createSelector } from '@ngrx/store';
import { groupsNode, IGroupsState } from '../reducers/groups.reducers';

export const selectGroupsFeature =
  createFeatureSelector<IGroupsState>(groupsNode);

export const selectGroups = createSelector(
  selectGroupsFeature,
  (state: IGroupsState): IGroupsState => state
);
