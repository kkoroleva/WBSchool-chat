import { createAction, props } from '@ngrx/store';
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
  props<{ err: string }>()
);
