import { createReducer, on } from '@ngrx/store';
import { changeLoadGroups, loadGroups, } from '../actions/groups.actions';

export const groupsNode = 'groups';

export interface IGroupsState {
    groups: IGroup[];
}

export interface IGroup {
  _id: string;
  name: string;
  about?: string;
  owner?: string;
  lastMessage?: string;
  avatar?: string;
  users?: string[];
}

const initialState: IGroupsState = {
    groups: []
}

export const groupsReducer = createReducer(
    initialState,
    on(loadGroups, (state) => ({
        ...state,
        groups: state.groups
    })),
    on(changeLoadGroups, (state, action) => ({
        ...state,
        groups: action.groups
    })),
)