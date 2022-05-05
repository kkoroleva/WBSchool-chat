import { IThread } from 'src/app/threads/thread';
import { IThreadState } from './../reducers/threads.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { threadNode } from '../reducers/threads.reducer';


export const selectThreadFeature = createFeatureSelector<IThreadState>(threadNode);

export const selectThread = createSelector(
  selectThreadFeature,
  (state: IThreadState) : IThread => state.thread
)
