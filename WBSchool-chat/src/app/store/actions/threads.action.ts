import { IDeleteComment } from './../../socket/thread-socket.service';
import { createAction, props } from '@ngrx/store';
import { IMessage } from '../../../interfaces/dialog-interface';
import { IComment, IThread } from '../../../interfaces/thread-interface';

export const initThread = createAction(
  '[THREAD] initThread',
  props<{ chatId: string; messageId: string }>()
);

export const loadThread = createAction(
  '[THREAD] loadThread',
  props<{ thread: IThread }>()
);
export const createComment = createAction(
  '[THREAD] createComment',
  props<{ comment: IComment }>()
);

export const deleteComment = createAction(
  '[THREAD] deleteComment',
  props<{ comment: IDeleteComment }>()
);

export const editComment = createAction(
  '[THREAD] editComment',
  props<{ comment: IComment }>()
);

export const getMessage = createAction(
  '[THREAD] getMessage',
  props<{ message: IMessage }>()
);
