import { IUser } from '../../groups/user';
import { createAction, props } from '@ngrx/store';
import { IPrivate } from 'src/app/friends/private';
import { IGroup } from 'src/app/groups/group';

export const loadGroups = createAction('[GROUPS] loadGroups');
export const changeLoadGroups = createAction(
  '[GROUPS] changeLoadGroups',
  props<{ groups: IGroup[] }>()
);

export const changeChatGroup = createAction(
  '[GROUPS] changeChatGroup',
  props<{ chatGroup: string }>()
);

export const createChatGroup = createAction(
  '[GROUPS] createChatGroup',
  props<{ group: IGroup }>()
);

export const pushToGroups = createAction(
  '[GROUPS] pushToGroups',
  props<{ group: IGroup }>()
);

export const chatGroupError = createAction(
  '[GROUPS] chatGroupError',
  props<{ error: string }>()
);

export const setGroup = createAction(
  '[GROUPS] setGroup',
  props<{ group: IGroup }>()
);

export const editGroup = createAction(
  '[GROUPS] editGroup',
  props<{ id: string; editGroup: IGroup }>()
);

export const editToGroups = createAction(
  '[GROUPS] editToGroups',
  props<{ group: IGroup }>()
);

export const getGroupUsers = createAction(
  '[GROUPS] getGroupUsers',
  props<{ id: string }>()
);

export const setGroupUsers = createAction(
  '[GROUPS] setGroupUsers',
  props<{ users: IUser[] }>()
);

export const deleteGroup = createAction(
  '[GROUPS] deleteGroup',
  props<{ id: string }>()
);

export const deleteFromGroups = createAction(
  '[GROUPS] deleteFromGroups',
  props<{ id: string }>()
);

// Chats
export const loadFriends = createAction('[FRIENDS] loadFriends');
export const changeLoadFriends = createAction(
  '[FRIENDS] changeLoadFriends',
  props<{ friends: IPrivate[] }>()
);

export const createChatFriend = createAction(
  '[FRIENDS] createChatFriend',
  props<{ username: string; ownerUsername: string }>()
);

export const deleteChatFriend = createAction(
  '[FRIENDS] deleteChatFriend',
  props<{ chatId: string }>()
);

export const updateChatFriends = createAction(
  '[FRIENDS] updateChatFriends',
  props<{ chatId: string }>()
);

export const pushToFriends = createAction(
  '[FRIENDS] pushToFriends',
  props<{ friend: IPrivate }>()
);


