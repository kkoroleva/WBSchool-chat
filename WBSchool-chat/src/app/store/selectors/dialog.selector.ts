import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { dialogNode, IDialogState, IMessage } from '../reducers/dialog.reducer';

export const selectDialogFeature = createFeatureSelector<IDialogState>(dialogNode)

export const selectDialog = createSelector(
    selectDialogFeature,
    (state: IDialogState) : IMessage[] => state.messages
)