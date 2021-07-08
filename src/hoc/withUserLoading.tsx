import React, { useContext } from 'react';
import { useAutoLogin } from '../hooks/useAutoLogin';
import LoadingScreen from '../components/common/LoadingScreen';
import { User } from '../models/UserModel';
import { Action } from '../reducers/UserReducer';
import { UserContext } from '../contexts/UserProvider';
import InactiveUserScreen from '../components/common/InactiveUserScreen';

interface WrappedComponentProps {
  userIsLogged: boolean,
}

export const withUserLoading = (WrappedComponent: React.FC<WrappedComponentProps>) => () => {
  const [user, dispatch] = useContext<[User, React.Dispatch<Action>]>(UserContext);
  const { userIsLoading, userIsLogged } = useAutoLogin();

  if (userIsLoading) {
    return <LoadingScreen />
  }

  if (user.isActive === false) {
    return <InactiveUserScreen />;
  }

  return <WrappedComponent userIsLogged={userIsLogged} />
}

export default withUserLoading;
