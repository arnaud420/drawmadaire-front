import { Badge } from './BadgeModel';
import { GameHistory, GamePhase, Player } from './GameModel';

export enum ItemType {
  SENTENCE = 'SENTENCE',
  DRAW = 'DRAW',
}

export interface PlayerItem {
  player: Player,
  item: Item,
  phase: GamePhase,
  help?: string;
}

export interface Item {
  id: number;
  content: string;
  userGame: Player;
  type: ItemType;
  gameHistory: GameHistory;
  badges?: Badge[];
  createdAt: Date;
  updatedAt: Date;
}
