import { AVATAR_COLORS, AVATAR_HEADS, AVATAR_MOUTHS } from '../models/AvatarModel';
import { User } from '../models/UserModel';

export const SET_PSEUDO = 'SET_PSEUDO';
export const SET_AVATAR_COLOR = 'SET_AVATAR_COLOR';
export const SET_AVATAR_HEAD = 'SET_AVATAR_HEAD';
export const SET_AVATAR_MOUTH = 'SET_AVATAR_MOUTH';
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export interface Action {
  type: string;
  payload?: any;
}

export const userInitialState: User = {
  pseudo: '',
  avatar: {
    color: AVATAR_COLORS.PEACH,
    head: AVATAR_HEADS.WITCH,
    mouth: AVATAR_MOUTHS.PIZZA,
  },
  email: undefined,
  isActive: undefined,
  isUnauth: undefined,
  id: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  stats: undefined,
}

export const userReducer = (state: User, action: Action) => {
  switch (action.type) {
    case SET_PSEUDO:
      return {
        ...state,
        pseudo: action.payload,
      }
    case SET_AVATAR_COLOR:
      return {
        ...state,
        avatar: {
          ...state.avatar,
          color: action.payload,
        },
      }
    case SET_AVATAR_HEAD:
      return {
        ...state,
        avatar: {
          ...state.avatar,
          head: action.payload,
        },
      }
    case SET_AVATAR_MOUTH:
      return {
        ...state,
        avatar: {
          ...state.avatar,
          mouth: action.payload,
        },
      }
    case SET_USER:
      return {
        ...state,
        ...action.payload,
        avatar: JSON.parse(action.payload.avatar),
      }
    case LOGOUT_USER:
      return userInitialState;
    default:
      return state;
  }
}
