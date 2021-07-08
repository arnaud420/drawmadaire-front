import React, {
  useContext, useEffect, useState,
} from 'react';
import './Instruction.scss';
import { Game as GameModel, GamePhase } from '../../../models/GameModel';
import { Action } from '../../../reducers/GameReducer';
import { GameContext } from '../../../contexts/GameProvider';
import { useTimeConverter } from '../../../hooks/useTimeConverter';

interface Props {
  phase: GamePhase,
}

const Instruction: React.FC<Props> = ({ phase }: Props) => {
  const [game] = useContext<[GameModel, React.Dispatch<Action>]>(GameContext);
  const [withClock, setWithClock] = useState(false)
  const { minutes, seconds } = useTimeConverter(game.remainingTime);

  useEffect(() => {
    setWithClock(phase === GamePhase.DRAW || phase === GamePhase.GUESS)
  }, [phase])

  const getPhaseInstruction = (p: Props['phase']) => {
    switch (p) {
      case GamePhase.SENTENCE:
        return 'Début de la partie'
      case GamePhase.DRAW:
        return `Dessinez : ${game.receivedItem?.content}`
      default:
        return 'Devinez le dessin suivant'
    }
  }

  return (
    <div id="instruction-container">
      <h2
        id="instruction"
        style={!withClock ? {
          margin: 'auto',
          textAlign: 'center',
        } : {}}
      >
        {getPhaseInstruction(phase)}
      </h2>

      { game.clue && <p className="clue">{`Indice : ${game.clue}`}</p> }

      {withClock && (
        <div id="clock" className={minutes === 0 && seconds <= 10 && seconds > 0 ? 'danger' : ''}>
          <img alt="Clock icon" src={require('../../../assets/img/clock-white.png').default} />
          <div>
            <span>{`0${minutes.toString()}`}</span>
            :
            <span>{`${seconds < 10 ? '0' : ''}${seconds.toString()}`}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Instruction;
