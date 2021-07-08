import { App, MessageType } from '../models/AppModel';

export const SET_SUCCESS = 'SET_SUCCESS';
export const SET_INFO = 'SET_INFO';
export const SET_WARNING = 'SET_WARNING';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const SET_IS_MODAL_OPENED = 'SET_IS_MODAL_OPENED';

export interface Action {
  type: string;
  payload?: any;
}

export const appInitialState: App = {
  message: undefined,
  isModalOpened: false,
}

export const appReducer = (state: App, action: Action) => {
  switch (action.type) {
    case SET_SUCCESS:
      return {
        ...state,
        message: {
          content: action.payload,
          type: MessageType.SUCCESS,
        },
      }
    case SET_INFO:
      return {
        ...state,
        message: {
          content: action.payload,
          type: MessageType.INFO,
        },
      }
    case SET_WARNING:
      return {
        ...state,
        message: {
          content: action.payload,
          type: MessageType.WARNING,
        },
      }
    case SET_ERROR:
      return {
        ...state,
        message: {
          content: action.payload,
          type: MessageType.DANGER,
        },
      }
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: undefined,
      }
    case SET_IS_MODAL_OPENED:
      return {
        ...state,
        isModalOpened: action.payload,
      }
    default:
      return state;
  }
}
