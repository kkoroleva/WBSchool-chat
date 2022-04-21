import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMessage } from 'src/app/dialog/dialog';
import { dialogNode, IDialogState } from '../reducers/dialog.reducer';

export const selectDialogFeature = createFeatureSelector<IDialogState>(dialogNode)

export const selectDialog = createSelector(
    selectDialogFeature,
    (state: IDialogState) : IMessage[] => state.messages
)
