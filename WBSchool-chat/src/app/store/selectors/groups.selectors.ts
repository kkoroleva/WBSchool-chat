import { IGroupsMessages } from './../reducers/groups.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPrivate } from './../../friends/private';
import { IGroup } from './../../groups/group';
import { IUser } from './../../groups/user';
import { groupsNode, IGroupsState } from '../reducers/groups.reducers';

export const selectGroupsFeature =
  createFeatureSelector<IGroupsState>(groupsNode);

export const selectGroups = createSelector(
  selectGroupsFeature,
  (state: IGroupsState): IGroup[] => state.groups
);

export const selectGroup = createSelector(
  selectGroupsFeature,
  (state: IGroupsState): IGroup => state.group
);

export const selectChatGroup = createSelector(
  selectGroupsFeature,
  (state: IGroupsState): any => state.chatGroup
);

export const selectChatGroupError = createSelector(
  selectGroupsFeature,
  (state: IGroupsState): string => state.error
);

export const selectGroupUsers = createSelector(
  selectGroupsFeature,
  (state: IGroupsState): IUser[] => state.groupUsers
);

export const selectFriends = createSelector(
  selectGroupsFeature,
  (state: IGroupsState): IPrivate[] => state.friends
);

export const selectLastGroupsMessages = createSelector(
  selectGroupsFeature,
  (state: IGroupsState): IGroupsMessages[] => state.lastMessages
);
