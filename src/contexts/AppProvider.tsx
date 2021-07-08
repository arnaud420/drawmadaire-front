import React, { ReactElement, useReducer } from 'react';
import { App } from '../models/AppModel';
import { appInitialState, appReducer, Action } from '../reducers/AppReducer';

interface Props {
  children ?: ReactElement|ReactElement[]
}

// @ts-ignore
export const AppContext = React.createContext<[App, React.Dispatch<Action>]>([]);

const GameProvider: React.FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer<React.Reducer<App, Action>>(appReducer, appInitialState);

  return (
    // @ts-ignore
    <AppContext.Provider value={[state, dispatch]}>
      { children }
    </AppContext.Provider>
  )
}

export default GameProvider;
