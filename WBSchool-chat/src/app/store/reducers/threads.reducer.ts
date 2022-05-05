import { createReducer, on } from '@ngrx/store';
import { IThread } from '../../../interfaces/thread-interface';
import {
  createComment,
  deleteComment,
  editComment,
  loadThread,
} from '../actions/threads.action';

export const threadNode = 'Thread';
export interface IThreadState {
  thread: IThread;
}

const initialState: IThreadState = {
  thread: {
    _id: '',
    owner: '',
    ownerName: '',
    avatar: '',
    formatImage: '',
    isActive: false,
    basicPost: {
      date: '',
      imageOrFile: '',
      formatImage: '',
      text: '',
    },
    comments: [],
  },
};

export const threadReducer = createReducer(
  initialState,
  on(loadThread, (state, action) => ({
    ...state,
    thread: action.thread,
  })),
  on(editComment, (state, action) => ({
    ...state,
    thread: {
      ...state.thread,
      comments: state.thread.comments.map((comment) => {
        return action.comment.authorID === comment.authorID &&
          action.comment.date === comment.date
          ? action.comment
          : comment;
      }),
    },
  })),
  on(deleteComment, (state, action) => ({
    ...state,
    thread: {
      ...state.thread,
      comments: state.thread.comments.filter((comment) => {
        return (
          action.comment.authorId !== comment.authorID &&
          action.comment.date !== comment.date
        );
      }),
    },
  })),
  on(createComment, (state, action) => ({
    ...state,
    thread: {
      ...state.thread,
      comments: [...state.thread.comments, action.comment],
    },
  }))
);
