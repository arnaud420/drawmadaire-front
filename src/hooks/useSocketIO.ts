import React, { useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { User } from '../models/UserModel';
import { Action } from '../reducers/UserReducer';
import { UserContext } from '../contexts/UserProvider';
import { GameContext } from '../contexts/GameProvider';
import { Game, GameHistory, GamePhase } from '../models/GameModel';
import {
  CHANGE_PHASE,
  INIT_SOCKET, INITIALIZE_GAME, NEW_ITEM, SET_PLAYER_IS_WAITING,
  SET_PLAYERS, SET_RESULTS, SET_TIME, UPDATE_SETTINGS,
} from '../reducers/GameReducer';
import { App } from '../models/AppModel';
import { AppContext } from '../contexts/AppProvider';
import { SET_ERROR } from '../reducers/AppReducer';
import { PlayerItem } from '../models/ItemModel';

export const useSocketIO = (roomId: string) => {
  const [game, dispatch] = useContext<[Game, React.Dispatch<Action>]>(GameContext);
  const [app, dispatchApp] = useContext<[App, React.Dispatch<Action>]>(AppContext);
  const [user] = useContext<[User, React.Dispatch<Action>]>(UserContext);

  useEffect(() => {
    if (user.id) {
      const socket = io(process.env.REACT_APP_API_URL as string);
      dispatch({ type: INIT_SOCKET, payload: socket })
      socket.on('connect', () => {
        socket.emit('join', { roomId, userId: user.id })
      })

      socket.on('initGameData', (game: Game) => {
        dispatch({ type: INITIALIZE_GAME, payload: game })
      })

      socket.on('userJoined', (users: string) => {
        dispatch({ type: SET_PLAYERS, payload: users })
      })

      socket.on('updateSettings', (game: string) => {
        dispatch({ type: UPDATE_SETTINGS, payload: game })
      })

      socket.on('newPhase', (phase: GamePhase) => {
        dispatch({ type: CHANGE_PHASE, payload: phase })
      })

      socket.on('playerIsWaiting', (playerId: number) => {
        dispatch({ type: SET_PLAYER_IS_WAITING, payload: playerId })
      })

      socket.on('newItem', (item: PlayerItem) => {
        dispatch({ type: NEW_ITEM, payload: item })
      })

      socket.on('results', (payload: { results: GameHistory[], phase: GamePhase }) => {
        dispatch({ type: SET_RESULTS, payload })
      })

      socket.on('time', (timeInSeconds: number) => {
        dispatch({ type: SET_TIME, payload: timeInSeconds })
      })

      socket.on('customError', (error: string) => {
        dispatchApp({ type: SET_ERROR, payload: error })
      })
    }
  }, [user]);
};
