import { createAction, props } from '@ngrx/store';
import { IMessage } from 'src/app/dialog/dialog';

export const initDialogs = createAction('[DIALOG] initDialogs',
props<{ id: string}>());

export const loadDialogs = createAction('[DIALOG] loadDialogs', 
props<{ messages: IMessage[] }>());

export const sendMessage = createAction('[DIALOG] sendMessage', 
props< {message: IMessage, id:string}>());

export const pushToMessages = createAction('[DIALOG] pushToMessages', 
props<{ message: IMessage}>());

export const deletedMessage = createAction('[DIALOG] deletedMessage',
props<{ id: string, idChat: string | undefined}>());

export const editMessage = createAction('[DIALOG] editMessage', 
props<{ text: string , id: string | undefined, idChat: string | undefined}>());
