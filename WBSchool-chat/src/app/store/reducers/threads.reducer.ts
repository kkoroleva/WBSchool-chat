import { IThread } from 'src/app/threads/thread';
import { createReducer, on } from '@ngrx/store';
import {
  createComment,
  deleteComment,
  editComment,
  getMessage,
  loadThread,
} from '../actions/threads.action';
import { IMessage } from 'src/app/dialog/dialog';

export const threadNode = 'Thread';
export interface IThreadState {
  thread: IThread;
  message: IMessage;
}

const initialState: IThreadState = {
  message: {
    text: '',
  },
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
  })),
  on(getMessage, (state, action) => ({
    ...state,
    message: action.message,
  })),
);
