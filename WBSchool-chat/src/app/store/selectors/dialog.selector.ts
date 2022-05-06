import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAllMessages } from '../../../interfaces/lastMessages-interface';
import { IChatInfo, IMessage } from '../../../interfaces/dialog-interface';
import {
  dialogNode,
  lastMessagesNode,
  ILastMessagesState,
  IDialogState,
} from '../reducers/dialog.reducer';

export const selectDialogFeature =
  createFeatureSelector<IDialogState>(dialogNode);

export const selectDialog = createSelector(
  selectDialogFeature,
  (state: IDialogState): IMessage[] => state.messages
);

export const selectChatInfo = createSelector(
  selectDialogFeature,
  (state: IDialogState): IChatInfo => state.chatInfo
);

export const selectAllChatsMessagesFeature =
  createFeatureSelector<ILastMessagesState>(lastMessagesNode);

export const selectAllChatsMessages = createSelector(
  selectAllChatsMessagesFeature,
  (state: ILastMessagesState): IAllMessages[] => state.chatsMessages
);
