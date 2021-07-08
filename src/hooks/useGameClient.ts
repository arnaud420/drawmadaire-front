import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useAPIClient } from './useAPIClient';
import { Game } from '../models/GameModel';
import { Action } from '../reducers/UserReducer';
import { GameContext } from '../contexts/GameProvider';
import { INITIALIZE_GAME } from '../reducers/GameReducer';
import { User } from '../models/UserModel';
import { UserContext } from '../contexts/UserProvider';

export const useGameClient = () => {
  const history = useHistory();
  const [user] = useContext<[User, React.Dispatch<Action>]>(UserContext);
  const [game, dispatch] = useContext<[Game, React.Dispatch<Action>]>(GameContext);
  const { post } = useAPIClient();

  const createGame = async (isPublic: boolean = false) => {
    if (isPublic) {
      // TODO: Get public room
    } else {
      const game = await post('/games/new', {
        userId: user.id,
        isPrivate: !isPublic,
      })

      if (game) {
        dispatch({
          type: INITIALIZE_GAME,
          payload: game,
        })

        history.push(`/game/${game.roomId}`);
      }
    }
  }

  return { createGame };
}
