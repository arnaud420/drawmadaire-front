import React, { useContext, useEffect, useState } from 'react';
import './JoinGameButton.scss';
import { BUTTON_COLOR } from '../../common/Button/Button';
import Button from '../../common/Button';
import { User } from '../../../models/UserModel';
import { Action } from '../../../reducers/UserReducer';
import { UserContext } from '../../../contexts/UserProvider';
import { useUserClient } from '../../../hooks/useUserClient';
import { useGameClient } from '../../../hooks/useGameClient';
import { App } from '../../../models/AppModel';
import { AppContext } from '../../../contexts/AppProvider';
import { SET_ERROR } from '../../../reducers/AppReducer';

interface Props {
  label: string;
  color: BUTTON_COLOR;
  action?: () => void;
}

const JoinGameButton: React.FC<Props> = ({
  label, color, action,
}: Props) => {
  const [wantToJoinGame, setWantToJoinGame] = useState(false);
  const [user] = useContext<[User, React.Dispatch<Action>]>(UserContext);
  const [app, appDispatch] = useContext<[App, React.Dispatch<Action>]>(AppContext);
  const { createUnauthUser, updateUser } = useUserClient();

  useEffect(() => {
    if (wantToJoinGame && user.id && action !== undefined) {
      action();
      setWantToJoinGame(false);
    }
  }, [user.id, wantToJoinGame])

  /**
   * Check user.
   */
  const joinGame = async () => {
    setWantToJoinGame(true);

    if (user.pseudo.length <= 0) {
      appDispatch({
        type: SET_ERROR,
        payload: 'Le pseudo est obligatoire.',
      })
      return
    }

    if (!user.id) {
      await createUnauthUser();
    } else {
      await updateUser();
    }
  }

  return (
    <Button
      label={label}
      onClick={() => joinGame()}
      color={color}
      disabled={user.pseudo.length <= 0}
    />
  );
}

export default JoinGameButton;
