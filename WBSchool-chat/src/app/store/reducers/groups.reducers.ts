import { createReducer, on } from '@ngrx/store';
import { changeChatGroup, changeLoadGroups, loadGroups, pushToGroups, } from '../actions/groups.actions';

export const groupsNode = 'groups';

export interface IGroupsState {
    groups: IGroup[];
    chatGroup: string;
}

export interface IGroup {
  _id?: string;
  name: string;
  about?: string;
  owner?: string;
  lastMessage?: string;
  avatar?: string;
  users?: string[];
}

const chatIDFromLocalStorage = localStorage.getItem('chatID');

const initialState: IGroupsState = {
    groups: [],
    chatGroup: chatIDFromLocalStorage
    ? chatIDFromLocalStorage
    : ''
}

export const groupsReducer = createReducer(
    initialState,
    // on(loadGroups, (state) => ({
    //     ...state,
    //     groups: state.groups
    // })),
    on(changeChatGroup, (state, action) => ({
        ...state,
        chatGroup: action.chatGroup
    })),
    on(changeLoadGroups, (state, action) => ({
        ...state,
        groups: action.groups
    })),
    on(pushToGroups, (state, action) => ({
        ...state,
        groups: [...state.groups, action.group]
    }))
)

