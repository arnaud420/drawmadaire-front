import React from 'react';
import './Avatar.scss';
import {
  AVATAR_COLORS,
  AVATAR_HEADS,
  AVATAR_MOUTHS,
  // getHeadPosition,
  // getMouthPosition,
} from '../../../models/AvatarModel';
import Camel from './Camel';

interface Props {
  color: string,
  head: AVATAR_HEADS,
  mouth: AVATAR_MOUTHS,
  size?: number,
}

const Avatar = ({
  color,
  head,
  mouth,
  size,
}: Props) => {
  const headSrc = require(`../../../assets/img/${head}.png`).default
  const mouthSrc = require(`../../../assets/img/${mouth}.png`).default

  return (
    <div className="avatar" style={{ height: size, width: size }}>
      <Camel color={color} size={size! / 1.5} />
      <div
        className="head"
      >
        <img
          src={headSrc}
          alt={`${head} icon`}
          width="100%"
        />
      </div>
      <div
        className="mouth"
      >
        <img
          src={mouthSrc}
          alt={`${mouth} icon`}
          width="100%"
        />
      </div>
    </div>
  );
}

Avatar.defaultProps = {
  size: window.matchMedia('(max-width: 768px)').matches ? window.innerWidth / 5 : window.innerHeight / 7,
}

export default Avatar;
