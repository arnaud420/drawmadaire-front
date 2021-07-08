/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './Game.scss';
import Players from './Players';
import Waiting from '../Waiting'
import Instruction from './Instruction';
import GameBoard from './GameBoard';
import { useSocketIO } from '../../hooks/useSocketIO';
import MainContainer from '../common/MainContainer';
import { Game as GameModel, GamePhase } from '../../models/GameModel';
import { Action, RESET_GAME } from '../../reducers/GameReducer';
import { GameContext } from '../../contexts/GameProvider';
import { App } from '../../models/AppModel';
import { AppContext } from '../../contexts/AppProvider';
import { SET_INFO } from '../../reducers/AppReducer';
import { preventTabClose } from '../../helpers/generic';
import withUserLoading from '../../hoc/withUserLoading';
import Results from './Results';

interface Props {
  userIsLogged: boolean;
}

const Game: React.FC<Props> = ({ userIsLogged }) => {
  const [game, dispatch] = useContext<[GameModel, React.Dispatch<Action>]>(GameContext);
  const [app, dispatchApp] = useContext<[App, React.Dispatch<Action>]>(AppContext);
  const { roomId } = useParams<{ roomId: string }>()
  const history = useHistory();
  useSocketIO(roomId);

  useEffect(() => {
    window.addEventListener('beforeunload', preventTabClose);

    return () => {
      window.removeEventListener('beforeunload', preventTabClose);
      dispatch({ type: RESET_GAME })
    }
  }, [])

  if (!userIsLogged) {
    dispatchApp({ type: SET_INFO, payload: 'Créez votre personnage ou connectez vous avant de rejoindre la partie.' })
    history.push('/', { room: roomId });
  }

  switch (game.phase) {
    case GamePhase.WAITING:
      return (
        <MainContainer>
          <Waiting />
        </MainContainer>
      );
    case GamePhase.SENTENCE:
    case GamePhase.DRAW:
    case GamePhase.GUESS:
      return (
        <MainContainer>
          <div id="game-container">
            <Players players={game.players} />

            <div id="game">
              <Instruction phase={game.phase} />
              <GameBoard phase={game.phase} />
            </div>
          </div>
        </MainContainer>
      )
    case GamePhase.RESULTS:
      return <Results />
    default:
      return null;
  }
}

export default withUserLoading(Game);
