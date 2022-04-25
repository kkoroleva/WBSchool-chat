import { IUser } from 'src/app/groups/user';
import { createAction, props } from '@ngrx/store';
import { IFriend } from 'src/app/friends/friend';
import { IUnread } from 'src/app/unread/unread';
import { IGroup } from '../reducers/groups.reducers';

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

//Friends
export const loadFriends = createAction('[FRIENDS] loadFriends');
export const changeLoadFriends = createAction(
  '[FRIENDS] changeLoadFriends',
  props<{ friends: IFriend[] }>()
);

export const createChatFriend = createAction(
  '[FRIENDS] createChatFriend',
  props<{ username: string; ownerUsername: string }>()
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
