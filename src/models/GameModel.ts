import { User } from './UserModel';
import { Item } from './ItemModel';

export interface GameHistory {
  id: number;
  items?: Item[];
  createdAt: string;
  updatedAt: string;
}

export enum GameSettings {
  MAX_USER = 'maxUser',
  DRAW_TIME = 'drawTime',
  TYPE = 'type',
  MAX_LETTER = 'maxLetter',
  HELP = 'help',
}

export enum HelpType {
  NONE = 'NONE',
  LENGTH = 'LENGTH',
}

export enum RoundType {
  WORD = 'WORD',
  SENTENCE = 'SENTENCE',
  BOTH = 'BOTH',
}

export enum GamePhase {
  WAITING = 'waiting',
  SENTENCE = 'sentence',
  DRAW = 'draw',
  GUESS = 'guess',
  RESULTS = 'results',
}

export interface Player {
  id: number;
  userId: number;
  gameId: number;
  position: number;
  sentence?: string;
  isWaiting: boolean;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface Game {
  socket: any;
  players: Player[];
  roomId?: string;
  phase: GamePhase;
  owner?: User;
  maxUser: number;
  drawTime: number;
  type: RoundType;
  help?: HelpType;
  clue?: string;
  maxLetter?: number;
  receivedItem?: Item,
  id?: number;
  createdAt?: string,
  updatedAt?: string;
  results?: GameHistory[];
  badges?: any;
  remainingTime: number;
}
