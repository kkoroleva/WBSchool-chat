import {
  changeLoadFriends,
  chatGroupError,
  deleteFromGroups,
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
import { IPrivate } from 'src/app/friends/private';
import { IUser } from 'src/app/groups/user';

export const groupsNode = 'Groups';

export interface IGroupsState {
  groups: IGroup[];
  group: IGroup;
  groupUsers: IUser[];
  friends: IPrivate[];
  chatGroup: string;
  error: string;
}

export interface IGroup {
  _id?: string;
  name: string;
  about?: string;
  owner?: string;
  lastMessage?: string;
  avatar?: string;
  users?: string[];
  formatImage?: string;
}

const chatIDFromLocalStorage = '';

const initialState: IGroupsState = {
  groups: [],
  group: { name: '' },
  groupUsers: [],
  friends: [],
  chatGroup: chatIDFromLocalStorage ? chatIDFromLocalStorage : '',
  error: '',
};

export const groupsReducer = createReducer(
  initialState,
  on(changeChatGroup, (state, action) => ({
    ...state,
    chatGroup: action.chatGroup,
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
);
