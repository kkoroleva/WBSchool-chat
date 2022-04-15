import { createFeatureSelector, createSelector } from '@ngrx/store';
import { groupsNode, IGroup, IGroupsState } from '../reducers/groups.reducers';

export const selectGroupsFeature =
  createFeatureSelector<IGroupsState>(groupsNode);

export const selectGroups = createSelector(
  selectGroupsFeature,
  (state: IGroupsState): IGroup[] => state.groups
);

export const selectChatGroup = createSelector(
  selectGroupsFeature,
  (state: IGroupsState): string => state.chatGroup
);

export const selectChatGroupError = createSelector(
  selectGroupsFeature,
  (state: IGroupsState): string => state.error
);
