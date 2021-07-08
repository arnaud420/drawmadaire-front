import React, { useContext, useState } from 'react';
import TextInputWithButton from '../TextInputWithButton';
import Hint from './Hint';
import './Write.scss';
import { Game, RoundType } from '../../../../models/GameModel';
import { Action } from '../../../../reducers/UserReducer';
import { GameContext } from '../../../../contexts/GameProvider';
import { usePlayer } from '../../../../hooks/usePlayer';
import { App } from '../../../../models/AppModel';
import { AppContext } from '../../../../contexts/AppProvider';
import { SET_ERROR } from '../../../../reducers/AppReducer';
import { getSentenceError, isSentenceValid } from '../../../../helpers/gameHelper';

const getGameType = (type: RoundType) => {
  switch (type) {
    case RoundType.WORD:
      return 'UN MOT';
    case RoundType.SENTENCE:
      return 'UNE PHRASE';
    default:
      return 'une expression';
  }
}

interface Props {}

const Write: React.FC<Props> = () => {
  const [game] = useContext<[ Game, React.Dispatch<Action>]>(GameContext);
  const [app, dispatchApp] = useContext<[App, React.Dispatch<Action>]>(AppContext);
  const [isValidated, setIsValidated] = useState(false);
  const player = usePlayer();

  const onSubmit = (value: string) => {
    if (player) {
      if (isSentenceValid(value, game.type)) {
        game.socket.emit('firstSentence', {
          gameId: game.id,
          content: value.trim(),
          playerId: player.id,
        })
        setIsValidated(true)
      } else {
        dispatchApp({
          type: SET_ERROR,
          payload: getSentenceError(game.type),
        })
      }
    }
  }

  return (
    <div id="game-board-container" className="draw">
      <Hint text={
        player && player.isWaiting
          ? 'En attente des autres joueurs...'
          : `Choisis ${getGameType(game.type)} que les autres devront dessiner et deviner !`
        }
      />
      {
        game.players.length % 2 === 0 && (
          <p className="indication">Tu seras le premier à dessiner ton expression.</p>
        )
      }
      <TextInputWithButton
        withMarginTop={false}
        onValidate={onSubmit}
        disabled={isValidated}
      />
    </div>
  );
}

export default Write;
