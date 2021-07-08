import React, { useContext, useEffect, useState } from 'react';
import { Game as GameModel } from '../../../../models/GameModel';
import { GameContext } from '../../../../contexts/GameProvider';
import { BADGE_TYPE } from '../../../../models/BadgeModel';
import { Action } from '../../../../reducers/UserReducer';
import Badge from './Badge/Badge';
import './Badges.scss';

const Badges = () => {
  const [game, dispatch] = useContext<[GameModel, React.Dispatch<Action>]>(GameContext);
  const [badges, setBadges] = useState<any>([]);

  useEffect(() => {
    setBadges(Object.keys(game.badges));
  }, [game.badges])

  if (!game.badges) {
    return null;
  }

  return (
    <div className="results-badges">
      Attribuez des badges au jeu des autres joueurs :
      <div className="badges">
        {
          badges.length >= 1
            ? badges.map((type: any) => (
              game.badges[type]
                ? <Badge key={`badges_${type}`} isDraggable type={type as BADGE_TYPE} />
                : null))
            : <span>&nbsp;Plus de badges à distribuer !</span>
        }
      </div>
    </div>
  )
};

export default Badges
