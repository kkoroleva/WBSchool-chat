import { createReducer, on } from '@ngrx/store';
import { changeLoadGroups, loadGroups, } from '../actions/groups.actions';

export const groupsNode = 'groups';

export interface IGroupsState {
    groups: IGroup[];
}

export interface IGroup {
  _id?: string;
  name: string;
  about?: string;
  owner?: string;
  lastMessage?: string;
  avatar?: string;
  users?: IUser[];
}
export interface IUser {
    _id: string;
    email: string;
    username: string;
    userRights: string;
    about: string;
    avatar: string;
}

const initialState: IGroupsState = {
    groups: [
        {
            name: 'InitialState User'
        }
    ]
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