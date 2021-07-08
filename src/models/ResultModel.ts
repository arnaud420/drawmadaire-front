import {
  GameHistory, GamePhase, HelpType, RoundType,
} from './GameModel';

export interface Result {
  drawTime: number;
  gameHistories: GameHistory[];
  help: HelpType;
  id: number;
  maxUser: number;
  phase: GamePhase;
  roomId: string;
  type: RoundType;
  updatedAt: string;
  createdAt: string;
}
