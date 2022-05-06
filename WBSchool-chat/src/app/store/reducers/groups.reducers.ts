import {
  allGroupsMessages,
  changeLoadFriends,
  chatGroupError,
  deleteFromGroups,
  deleteLastGroupMessage,
  editToGroups,
  loadFriends,
  pushToFriends,
  setGroup,
  setGroupUsers,
  updateChatFriends,
} from './../actions/groups.actions';
import { createReducer, on } from '@ngrx/store';
import {
  changeChatGroup,
  changeLoadGroups,
  pushToGroups,
} from '../actions/groups.actions';
import { IPrivate } from '../../../interfaces/private-interface';
import { IUser } from '../../../interfaces/user.groups-interface';
import { IGroup, IGroupsMessages } from '../../../interfaces/group-interface';

export const groupsNode = 'Groups';

export const groupsMessagesNode = 'Groups messages';

export interface IGroupsState {
  groups: IGroup[];
  group: IGroup;
  groupUsers: IUser[];
  friends: IPrivate[];
  chatGroup: {
    chatGroup: string,
    isPrivate: boolean,
  },
  error: string;
  lastMessages: IGroupsMessages[];
}

const chatIDFromLocalStorage = localStorage.getItem('chatID');
const isPrivateFromLocalStorage = localStorage.getItem('isPrivate');

const initialState: IGroupsState = {
  groups: [],
  group: { name: '' },
  groupUsers: [],
  friends: [],
  chatGroup: {
    chatGroup: chatIDFromLocalStorage ? chatIDFromLocalStorage : '',
    isPrivate: isPrivateFromLocalStorage ? JSON.parse(isPrivateFromLocalStorage) : false,
  },
  error: '',
  lastMessages: [],
};

export const groupsReducer = createReducer(
  initialState,
  on(changeChatGroup, (state, action) => ({
    ...state,
    chatGroup: {chatGroup: action.chatGroup, isPrivate: action.isPrivate}
  })),
  on(changeLoadGroups, (state, action) => ({
    ...state,
    groups: action.groups,
  })),
  on(pushToGroups, (state, action) => ({
    ...state,
    groups: [action.group, ...state.groups],
  })),
  on(chatGroupError, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(setGroup, (state, action) => ({
    ...state,
    group: action.group,
  })),
  on(editToGroups, (state, action) => ({
    ...state,
    groups: state.groups.map((group) =>
      group._id === action.group._id ? action.group : group
    ),
  })),
  on(setGroupUsers, (state, action) => ({
    ...state,
    groupUsers: action.users,
  })),
  on(deleteFromGroups, (state, action) => ({
    ...state,
    groups: state.groups.filter((group) => group._id !== action.id),
  })),
  // Chats
  on(loadFriends, (state) => ({
    ...state,
    friends: state.friends,
  })),
  on(changeLoadFriends, (state, action) => ({
    ...state,
    friends: action.friends,
  })),
  on(pushToFriends, (state, action) => ({
    ...state,
    friends: [action.friend, ...state.friends],
  })),
  on(updateChatFriends, (state, action) => ({
    ...state,
    friends: state.friends.filter(
      (friendChat) => friendChat._id !== action.chatId
    ),
  })),
  on(allGroupsMessages, (state, action) => ({
    ...state,
    lastMessages: [
      ...state.lastMessages.filter((chat) => chat.chatId !== action.chatId),
      {
        chatId: action.chatId,
        lastMessage: action.lastMessage,
        messageId: action.messageId,
      },
    ],
  })),
  on(deleteLastGroupMessage, (state, action) => ({
    ...state,
    lastMessages: state.lastMessages.filter(
      (chat) => chat.messageId !== action.id
    ),
  }))
);
