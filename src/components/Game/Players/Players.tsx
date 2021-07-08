import React from 'react';
import { Avatar } from '../../common/Avatar';
import './Players.scss';
import { Player } from '../../../models/GameModel';
import Dots from '../../../assets/img/dots.gif';
import Check from '../../../assets/img/check.png';

interface Props {
  players: Player[];
}

const Players: React.FC<Props> = ({ players }: Props) => (
  <div id="players-container">
    {players.map((player, index) => (
      <div id="player" key={index}>
        <div className="player-identity">
          <Avatar
            color={player.user.avatar.color}
            head={player.user.avatar.head}
            mouth={player.user.avatar.mouth}
            size={80}
          />
          <span className="player-name">{player.user.pseudo }</span>
        </div>
        <img
          className={`status ${player.isWaiting ? '' : 'finished'}`}
          src={player.isWaiting ? Check : Dots}
          alt="Player activity icon"
        />
      </div>
    ))}
  </div>
)

export default Players
