import React, { useContext, useEffect, useState } from 'react';
import { Game, Player } from '../models/GameModel';
import { Action } from '../reducers/UserReducer';
import { GameContext } from '../contexts/GameProvider';
import { User } from '../models/UserModel';
import { UserContext } from '../contexts/UserProvider';

export const usePlayer = () => {
  const [game] = useContext<[Game, React.Dispatch<Action>]>(GameContext);
  const [user] = useContext<[User, React.Dispatch<Action>]>(UserContext);
  const [player, setPlayer] = useState<Player|null>(null);

  useEffect(() => {
    if (game.players.length > 0 && user.id) {
      const currentPlayer = game.players.find(p => p.userId === user.id);

      if (currentPlayer) {
        setPlayer(currentPlayer);
      }
    }
  }, [game, user]);

  return player;
}
