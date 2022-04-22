import {createAction, props} from '@ngrx/store';

import {IMessage} from 'src/app/dialog/dialog';

export const initDialogs = createAction('[DIALOG] initDialogs',
  props<{ id: string }>());

export const loadDialogs = createAction('[DIALOG] loadDialogs',
  props<{ messages: IMessage[] }>());

export const sendMessage = createAction('[DIALOG] sendMessage',
  props<{ message: IMessage, id: string }>());

export const pushToMessages = createAction('[DIALOG] pushToMessages',
  props<{ message: IMessage }>());

export const removeMessage = createAction('[DIALOG] removeMessage',
  props<{ id: string | undefined, chatId: string | undefined }>());

export const deleteMessage = createAction('[DIALOG] deleteMessage',
  props<{ id: string }>());

export const newEditMessage = createAction('[DIALOG] newEditMessage',
  props<{ text: string, id: string | undefined, chatId: string | undefined }>());

export const editMessage = createAction('[DIALOG] editMessage',
  props<{ message: IMessage }>());
