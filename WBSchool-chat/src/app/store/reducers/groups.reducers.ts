import {
  changeLoadFriends,
  changeLoadUnreads,
  chatGroupError,
  clearUnreads,
  loadFriends,
  loadUnreads,
  pushToFriends,
} from './../actions/groups.actions';
import { createReducer, on } from '@ngrx/store';
import {
  changeChatGroup,
  changeLoadGroups,
  loadGroups,
  pushToGroups,
} from '../actions/groups.actions';
import { IFriend } from 'src/app/friends/friend';
import { IUnread } from 'src/app/unread/unread';

export const groupsNode = 'Groups';

export interface IGroupsState {
  groups: IGroup[];
  friends: IFriend[];
  unreads: IUnread[];
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

const chatIDFromLocalStorage = localStorage.getItem('chatID');

const initialState: IGroupsState = {
  groups: [],
  friends: [],
  unreads: [],
  chatGroup: chatIDFromLocalStorage ? chatIDFromLocalStorage : '',
  error: '',
};

export const groupsReducer = createReducer(
  initialState,
  on(loadGroups, (state) => ({
    ...state,
    groups: state.groups,
  })),
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
  //friends
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
  //unreads
  on(loadUnreads, (state) => ({
    ...state,
    unreads: state.unreads,
  })),
  on(changeLoadUnreads, (state, action) => ({
    ...state,
    unreads: action.unreads,
  }))
);
