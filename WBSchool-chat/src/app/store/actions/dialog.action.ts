import { createAction, props } from '@ngrx/store';
import { IMessage } from 'src/app/dialog/dialog';

export const initDialogs = createAction('[DIALOG] initDialogs',
props<{ id: string}>());
export const loadDialogs = createAction('[DIALOG] loadDialogs', 
props<{ messages: IMessage[] }> ());
