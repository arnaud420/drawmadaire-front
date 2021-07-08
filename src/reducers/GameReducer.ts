import { BadgeEnum } from '../models/BadgeModel';
import {
  Game, GamePhase, HelpType, Player, RoundType,
} from '../models/GameModel';

export const SET_PLAYERS = 'SET_PLAYERS';
export const INITIALIZE_GAME = 'INITIALIZE_GAME';
export const INIT_SOCKET = 'INIT_SOCKET';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const CHANGE_PHASE = 'CHANGE_PHASE';
export const RESET_GAME = 'RESET_GAME';
export const SET_PLAYER_IS_WAITING = 'SET_PLAYER_IS_WAITING';
export const NEW_ITEM = 'NEW_ITEM';
export const SET_RESULTS = 'SET_RESULTS';
export const SET_PLAYER_BADGES = 'SET_PLAYER_BADGES';
export const SET_TIME = 'SET_TIME';

export interface Action {
  type: string;
  payload?: any;
}

export const gameInitialState: Game = {
  socket: null,
  players: [],
  phase: GamePhase.WAITING,
  drawTime: 60,
  maxUser: 12,
  type: RoundType.BOTH,
  help: HelpType.NONE,
  badges: {
    [BadgeEnum.LAUGHING]: true,
    [BadgeEnum.IN_LOVE]: true,
    [BadgeEnum.SICK]: true,
  },
  remainingTime: 60,
}

export const gameReducer = (state: Game, action: Action) => {
  switch (action.type) {
    case INIT_SOCKET:
      return {
        ...state,
        socket: action.payload,
      }
    case SET_PLAYERS:
      return {
        ...state,
        players: action.payload.map((player: Player) => {
          const p = player;
          p.isWaiting = false;
          if (typeof p.user.avatar === 'string') {
            p.user.avatar = JSON.parse(player.user.avatar.toString() as string);
          }
          return p;
        }),
      }
    case INITIALIZE_GAME:
      return {
        ...state,
        ...action.payload,
      }
    case UPDATE_SETTINGS:
      return {
        ...state,
        ...action.payload,
        players: state.players,
      }
    case CHANGE_PHASE:
      return {
        ...state,
        phase: action.payload,
      }
    case SET_PLAYER_IS_WAITING:
      return {
        ...state,
        players: state.players.map(player => {
          const p = player;
          if (p.id === action.payload) {
            p.isWaiting = true
          }
          return p;
        }),
      }
    case NEW_ITEM:
      return {
        ...state,
        phase: action.payload.phase,
        receivedItem: action.payload.item,
        clue: action.payload.help,
        players: state.players.map(player => {
          const p = player;
          p.isWaiting = false
          return p;
        }),
        remainingTime: state.drawTime,
      }
    case SET_RESULTS:
      return {
        ...state,
        results: action.payload.results,
        phase: action.payload.phase,
        clue: null,
      }
    case SET_TIME:
      return {
        ...state,
        remainingTime: action.payload,
      }
    case SET_PLAYER_BADGES:
      return {
        ...state,
        badges: action.payload,
      }
    case RESET_GAME:
      return gameInitialState;
    default:
      return state;
  }
}
