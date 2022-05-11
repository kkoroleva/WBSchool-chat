import { createReducer, on } from '@ngrx/store';
import { IAllMessages } from '../../../interfaces/lastMessages-interface';
import { IChatInfo, IMessage } from '../../../interfaces/dialog-interface';
import {
  allChatsMessages,
  deleteMessage,
  editMessage,
  loadDialogs,
  newGetInfoChat,
  pushToMessages,
} from '../actions/dialog.action';

export const dialogNode = 'Dialog';

export const lastMessagesNode = 'LastMessages';

export interface IDialogState {
  messages: IMessage[];
  chatInfo: IChatInfo;
}

const initialState: IDialogState = {
  messages: [],
  chatInfo: {
      _id: "",
      name: "",
      formatImage: "", 
      about: "", 
      isNotifications: false, 
      isRead: false, 
      isActive: false, 
      owners: [], 
      __v: 0,
      chatGroup: "",
      avatar: "",
      users:[],
      usernames: [],
  }
}

export interface ILastMessagesState {
  chatsMessages: IAllMessages[];
}

const initialState2: ILastMessagesState = {
  chatsMessages: [],
};

export const dialogReducer = createReducer(
  initialState,
  on(loadDialogs, (state, action) => ({
    ...state,
    messages: action.messages,
  })),
  on(pushToMessages, (state, action) => ({
    ...state,
    messages: [...state.messages, action.message],
  })),
  on(deleteMessage, (state, action) => ({
    ...state,
    messages: state.messages.filter((message) => {
      return message._id !== action.id;
    }),
  })),
  on(editMessage, (state, action) => ({
    ...state,
    messages: state.messages.map((message) => {
      return action.message._id === message._id ? action.message : message;
    }),
  })),
  on(newGetInfoChat, (state, action) => ({
    ...state,
    chatInfo: action.chatInfo,
  }))
);

export const lastMessagesReducer = createReducer(
  initialState2,
  on(allChatsMessages, (state, action) => ({
    ...state,
    chatsMessages: [
      ...state.chatsMessages.filter((chat) => chat.chatId !== action.chatId),
      { chatId: action.chatId, lastMessage: action.lastMessage },
    ],
  }))
);
