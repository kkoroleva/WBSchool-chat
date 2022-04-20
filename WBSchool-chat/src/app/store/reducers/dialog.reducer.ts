import { createReducer, on } from '@ngrx/store';
import { deletedMessage, editMessage, initDialogs, loadDialogs, pushToMessages } from '../actions/dialog.action';

export const dialogNode = 'Dialog';

export interface IDialogState {
    messages: IMessage[],
}

export interface IMessage {
    text:string;
    owner?:string; 
    _id?:string;
    expiresIn?:string;
    imageOrFile?: string;
    formatImage?: string;
    idChat?:string;

}

const initialState: IDialogState = {
    messages:[], 
}

export const dialogReducer = createReducer(
  initialState,
    on(initDialogs, (state)=>({
        ...state, 
        messages: state.messages
    })),
    on(loadDialogs, (state, action)=>({
        ...state,
        messages: action.messages
    })),
    on(pushToMessages, (state, action)=>({
        ...state,
        messages: [...state.messages, action.message]
    })),
    on(deletedMessage, (state, action)=>({
        ...state, 
        messages: state.messages.filter((mess)=>{
            return mess._id !== action.id
        })
    })),
    on(editMessage, (state, action)=>({
        ...state,
        messages: state.messages.map((mess)=>{
           return action.id === mess._id ? action : mess
        })
        
    })),
)
