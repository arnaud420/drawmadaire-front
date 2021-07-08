import React, { ReactElement, useReducer } from 'react';
import { userReducer, userInitialState, Action } from '../reducers/UserReducer';
import { User } from '../models/UserModel';

interface Props {
  children ?: ReactElement|ReactElement[]
}

// @ts-ignore
export const UserContext = React.createContext<[User, React.Dispatch<Action>]>([]);

const UserProvider: React.FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer<React.Reducer<User, Action>>(userReducer, userInitialState);

  return (
    // @ts-ignore
    <UserContext.Provider value={[state, dispatch]}>
      { children }
    </UserContext.Provider>
  )
}

export default UserProvider;
