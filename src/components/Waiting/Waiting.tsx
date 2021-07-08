import React, { useContext } from 'react'
import { Avatar } from '../common/Avatar'
import './Waiting.scss'
import Badge from './Badge'
import { GameSettings } from './GameSettings'
import { ReactComponent as Crown } from '../../assets/img/crown.svg'
import { Game } from '../../models/GameModel';
import { Action } from '../../reducers/UserReducer';
import { GameContext } from '../../contexts/GameProvider';
import { UserContext } from '../../contexts/UserProvider';
import { User } from '../../models/UserModel';
import { BadgeEnum } from '../../models/BadgeModel'

const Waiting = () => {
  const [game] = useContext<[Game, React.Dispatch<Action>]>(GameContext);
  const [user] = useContext<[User, React.Dispatch<Action>]>(UserContext);

  return (
    <div id="waiting-screen">
      <div id="players-container">
        {game.players.map((player, index) => (
          <div className="player" key={index}>
            <Avatar
              color={player.user.avatar.color}
              head={player.user.avatar.head}
              mouth={player.user.avatar.mouth}
            />
            <div className="player-name">
              <span>{player.user.pseudo}</span>
              <div className="badges">
                <div />
              </div>
            </div>
            {index === 0 && <div id="crown"><Crown /></div>}
          </div>
        ))}
      </div>

      <div id="party-settings-container">
        <GameSettings isOwner={game.owner === user.id} />
      </div>
    </div>
  )
}

export default Waiting
