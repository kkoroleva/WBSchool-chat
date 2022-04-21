import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { IMessage, User } from 'src/app/dialog/dialog';
import { dialogNode, IDialogState } from '../reducers/dialog.reducer';

export const selectDialogFeature = createFeatureSelector<IDialogState>(dialogNode)

export const selectDialog = createSelector(
    selectDialogFeature,
    (state: IDialogState) : IMessage[] => state.messages
)

// export const selectData = createSelector(
//     selectDialogFeature,
//     (state: IDialogState) : User[] => state.usersData
// )