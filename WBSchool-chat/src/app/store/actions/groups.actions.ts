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

//Friends
export const loadFriends = createAction('[FRIENDS] loadFriends');
export const changeLoadFriends = createAction(
  '[FRIENDS] changeLoadFriends',
  props<{ friends: IFriend[] }>()
);

export const createChatFriend = createAction(
  '[FRIENDS] createChatFriend',
  props<{ friend: IFriend }>()
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
