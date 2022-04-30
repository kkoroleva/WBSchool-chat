import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMessage } from '../../dialog/dialog';
import { dialogNode, dialogsNode, IAllChatsMessages, IAllMessages, IChatInfo, IDialogState } from '../reducers/dialog.reducer';

export const selectDialogFeature = createFeatureSelector<IDialogState>(dialogNode)

export const selectDialog = createSelector(
    selectDialogFeature,
    (state: IDialogState): IMessage[] => state.messages
)

export const selectChatInfo = createSelector(
    selectDialogFeature,
    (state: IDialogState): IChatInfo => state.chatInfo
)

export const selectAllChatsMessagesFeature = createFeatureSelector<IAllChatsMessages>(dialogsNode)

export const selectAllChatsMessages = createSelector(
    selectAllChatsMessagesFeature,
    (state: IAllChatsMessages): IAllMessages[] => state.chatsMessages
)