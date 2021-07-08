import React from 'react';
import { BADGE_TYPE } from '../../../../../models/BadgeModel';
import './Badge.scss';

interface Props {
  type: BADGE_TYPE,
  counter?: number,
  isDraggable?: boolean,
}

const Badge: React.FC<Props> = ({ type, counter, isDraggable }: Props) => {
  const onDrag = (e: any) => {
    e.dataTransfer.setData('Badge', JSON.stringify(type));
  }

  return (
    <div className={`badge ${isDraggable ? 'is-draggable' : ''}`} draggable={isDraggable} onDragStart={isDraggable ? onDrag : undefined}>
      <span>
        <img src={require(`../../../../../assets/img/${type}.png`).default} alt={`${type} badge icon`} />
      </span>
      {
        counter && counter > 1
          ? <span>{counter}</span>
          : null
      }
    </div>
  )
}

export default Badge;
