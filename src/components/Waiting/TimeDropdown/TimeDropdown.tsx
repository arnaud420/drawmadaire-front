import React, { useContext, useEffect, useState } from 'react';
import './TimeDropdown.scss';
import Dropdown from 'react-dropdown';
import { Game } from '../../../models/GameModel';
import { Action } from '../../../reducers/UserReducer';
import { GameContext } from '../../../contexts/GameProvider';
import { useTimeConverter } from '../../../hooks/useTimeConverter';

interface Props {
  disabled: boolean;
  timeInSeconds: number;
}

const MIN_TIME = 10;

const TimeDropdown: React.FC<Props> = ({ disabled, timeInSeconds }: Props) => {
  const [game] = useContext<[Game, React.Dispatch<Action>]>(GameContext);
  const { minutes, seconds } = useTimeConverter(timeInSeconds);

  const emitTimeChange = (value: number) => {
    game.socket.emit('updateSettings', {
      settings: { drawTime: value },
      roomId: game.roomId,
    })
  }

  const onMinuteChange = (value: string) => {
    const newMinutes: number = parseInt(value, 10);
    let secondsToAdd = seconds

    if (newMinutes === 0 && seconds < MIN_TIME) {
      secondsToAdd = 10;
    }

    emitTimeChange((newMinutes * 60) + secondsToAdd)
  }

  const onSecondChange = (value: string) => {
    emitTimeChange((minutes * 60) + parseInt(value, 10))
  }

  const getDropdownValues = (isSeconds: boolean = false) => {
    const values = []
    const minValue = isSeconds && minutes === 0 ? MIN_TIME : 0;

    for (let i = minValue; i < (isSeconds ? 60 : 6); i += 1) {
      values.push(`${i < 10 ? `0${i}` : i}`)
    }

    return values
  }

  return (
    <div id="draw-time">
      <div id="draw-time-input" className={`${disabled ? 'guest' : ''}`}>
        <span className="time">
          <Dropdown
            options={getDropdownValues()}
            disabled={disabled}
            value={`0${minutes.toString()}`}
            onChange={(arg) => onMinuteChange(arg.value)}
          />
        </span>
        :
        <span className="time">
          <Dropdown
            options={getDropdownValues(true)}
            disabled={disabled}
            value={`${seconds < 10 ? '0' : ''}${seconds.toString()}`}
            onChange={(arg) => onSecondChange(arg.value)}
          />
        </span>
      </div>
      <span className="label">min</span>
    </div>
  );
}

export default TimeDropdown;
