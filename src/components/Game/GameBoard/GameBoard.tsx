import React from 'react';
import Draw from './Draw';
import './GameBoard.scss';
import Write from './Write';
import { GamePhase } from '../../../models/GameModel';

interface Props {
  phase: GamePhase,
}

const GameBoard: React.FC<Props> = ({ phase }: Props) => {
  switch (phase) {
    case GamePhase.DRAW:
      return <Draw />
    case GamePhase.GUESS:
      return <Draw withPalette={false} withInput />
    case GamePhase.SENTENCE:
      return <Write />
    default:
      return <Draw />
  }
}

export default GameBoard;
