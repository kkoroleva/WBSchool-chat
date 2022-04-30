import { createAction, props } from '@ngrx/store';

import { IMessage } from '../../dialog/dialog';
import { IChatInfo } from '../reducers/dialog.reducer';

export const initDialogs = createAction(
  '[DIALOG] initDialogs',
  props<{ id: string }>()
);

export const loadDialogs = createAction(
  '[DIALOG] loadDialogs',
  props<{ messages: IMessage[] }>()
);

export const sendMessage = createAction(
  '[DIALOG] sendMessage',
  props<{ message: IMessage; id: string }>()
);

export const pushToMessages = createAction(
  '[DIALOG] pushToMessages',
  props<{ message: IMessage }>()
);

export const removeMessage = createAction(
  '[DIALOG] removeMessage',
  props<{ id: string | undefined; chatId: string | undefined }>()
);

export const deleteMessage = createAction(
  '[DIALOG] deleteMessage',
  props<{ id: string }>()
);

export const newEditMessage = createAction(
  '[DIALOG] newEditMessage',
  props<{ text: string; id: string | undefined; chatId: string | undefined }>()
);

export const editMessage = createAction(
  '[DIALOG] editMessage',
  props<{ message: IMessage }>()
);

export const emptyMessage = createAction('[DIALOG] emptyMessage');

export const getInfoChat = createAction(
  '[DIALOG] getInfoChat',
  props<{ chatId: string }>()
);

export const newGetInfoChat = createAction(
  '[DIALOG] newGetInfoChat',
  props<{ chatInfo: IChatInfo }>()
);

export const changeChatInfo = createAction(
  '[DIALOG] changeChatInfo',
  props<{ chatInfo: IChatInfo }>()
);

export const getAllChatsMessages = createAction(
  '[DIALOG] getAlChatsMessages',
  props<{ chatId: string }>()
);

export const allChatsMessages = createAction(
  '[DIALOG] allChatsMessages',
  props<{ chatId: string; lastMessage: string }>()
);
