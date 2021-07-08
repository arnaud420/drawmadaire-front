import React from 'react';
import { BADGE_TYPE } from '../../../models/BadgeModel';
import './Badge.scss';

interface Props {
  type: BADGE_TYPE,
  total: number,
}

const Badge: React.FC<Props> = ({ type, total }: Props) => (
  <div className="badge">
    <span><img src={require(`../../../assets/img/${type}.png`).default} alt={`${type} badge icon`} /></span>
    <span>
      {total}
    </span>
  </div>
);

export default React.memo(Badge);
