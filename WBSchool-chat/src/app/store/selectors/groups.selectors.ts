import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IFriend } from 'src/app/friends/friend';
import { IUser } from 'src/app/groups/user';
import { IUnread } from 'src/app/unread/unread';
import { groupsNode, IGroup, IGroupsState } from '../reducers/groups.reducers';

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
  (state: IGroupsState): string => state.chatGroup
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
  (state: IGroupsState): IFriend[] => state.friends
);

export const selectUnreads = createSelector(
  selectGroupsFeature,
  (state: IGroupsState): IUnread[] => state.unreads
);

