import { IMessage } from '../../../interfaces/dialog-interface';
import { IUser } from '../../../interfaces/user.groups-interface';
import { createAction, props } from '@ngrx/store';
import { IPrivate } from '../../../interfaces/private-interface';
import { IGroup } from '../../../interfaces/group-interface';

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
  // props<{ username: string; ownerUsername: string }>()
  props<{ username: string; ownerUsername: string, ownerFormatImage: string, ownerAvatar: string }>()
);

export const deleteChatFriend = createAction(
  '[FRIENDS] deleteChatFriend',
  props<{ chatId: string }>()
);

export const outFromChatFriend = createAction(
  '[FRIENDS] outFromChatFriend',
  props<{ chatId: string, owners: string[] }>()
);

export const returnIntoChatFriend = createAction(
  '[FRIENDS] returnIntoChatFriend',
  props<{ chatId: string, users: string[] }>()
);

export const updateChatFriends = createAction(
  '[FRIENDS] updateChatFriends',
  props<{ chatId: string }>()
);

export const pushToFriends = createAction(
  '[FRIENDS] pushToFriends',
  props<{ friend: IPrivate }>()
);

export const getAllGroupsMessages = createAction('[GROUPS] getAllGroupsMessages',
  props<{chatId: string}>());

export const allGroupsMessages = createAction('[GROUPS] allGroupsMessages',
  props<{chatId: string, lastMessage: string, messageId: string}>());

export const deleteLastGroupMessage = createAction('[GROUPS] deleteLastGroupMessage',
  props<{id: string}>());
