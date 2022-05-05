import { createReducer, on } from '@ngrx/store';
import { IMessage } from '../../dialog/dialog';
import {
  allChatsMessages,
  deleteMessage,
  editMessage,
  initDialogs,
  loadDialogs,
  newGetInfoChat,
  pushToMessages,
} from '../actions/dialog.action';

export const dialogNode = 'Dialog';

export const dialogsNode = 'Dialogs';

export interface IDialogState {
  messages: IMessage[];
  chatInfo: IChatInfo;
}

export interface IAllMessages {
  chatId: string;
  lastMessage: string;
}

export interface IAllChatsMessages {
  chatsMessages: IAllMessages[];
}

export interface IChatInfo {
    _id: string,
    name: string,
    avatars: any[],
    formatImage: string,
    about: string,
    isNotifications: boolean,
    isRead: boolean,
    isActive: boolean,
    owners: string[], 
    __v: number, 
    chatGroup: string,
    avatar : string,
    users: string[],
    usernames: string[]
}

const initialState: IDialogState = {
    messages: [],
    chatInfo: {
        _id: "",
        name: "",
        avatars: [],
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

const initialState2: IAllChatsMessages = {
  chatsMessages: [],
};

export const dialogReducer = createReducer(
  initialState,
  // on(initDialogs, (state) => ({
  //     ...state,
  //     messages: state.messages
  // })),
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

export const allChatsMessagesReducer = createReducer(
  initialState2,
  on(allChatsMessages, (state, action) => ({
    ...state,
    chatsMessages: [
      ...state.chatsMessages.filter((chat) => chat.chatId !== action.chatId),
      { chatId: action.chatId, lastMessage: action.lastMessage },
    ],
  }))
);
