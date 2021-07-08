import React, { ReactElement, useReducer } from 'react';
import { Game } from '../models/GameModel';
import { gameInitialState, gameReducer, Action } from '../reducers/GameReducer';

interface Props {
  children ?: ReactElement|ReactElement[]
}

// @ts-ignore
export const GameContext = React.createContext<[Game, React.Dispatch<Action>]>([]);

const GameProvider: React.FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer<React.Reducer<Game, Action>>(gameReducer, gameInitialState);

  return (
    // @ts-ignore
    <GameContext.Provider value={[state, dispatch]}>
      { children }
    </GameContext.Provider>
  )
}

export default GameProvider;
