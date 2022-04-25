import { createAction, props } from '@ngrx/store';
import { IFriend } from 'src/app/friends/friend';
import { IGroup } from 'src/app/groups/group';
import { IUnread } from 'src/app/unread/unread';

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

// Chats
export const loadFriends = createAction('[FRIENDS] loadFriends');
export const changeLoadFriends = createAction(
  '[FRIENDS] changeLoadFriends',
  props<{ friends: IFriend[] }>()
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
  props<{ friend: IFriend }>()
);

//Unreads
export const loadUnreads = createAction('[UNREADS] loadUnreads');
export const changeLoadUnreads = createAction(
  '[UNREADS] changeLoadUnreads',
  props<{ unreads: IUnread[] }>()
);

export const clearUnreads = createAction('[UNREADS] clearUnreads');
