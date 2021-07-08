/* eslint-disable operator-assignment */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-plusplus */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { GameContext } from '../../../../../../contexts/GameProvider';
import { Game as GameModel } from '../../../../../../models/GameModel';
import { BADGE_TYPE, getBadgeTypeFromDb } from '../../../../../../models/BadgeModel';
import { Item } from '../../../../../../models/ItemModel';
import { Action } from '../../../../../../reducers/UserReducer';
import { Avatar } from '../../../../../common/Avatar';
import { Avatar as AvatarModel } from '../../../../../../models/AvatarModel';
import Canvas from '../../../../../common/Canvas';
import Badge from '../../../Badges/Badge';
import { SET_PLAYER_BADGES } from '../../../../../../reducers/GameReducer';
import './Draw.scss';
import { useWindowResolution } from '../../../../../../hooks/useWindowResolutions';
import { MOBILE_WIDTH } from '../../../../../../config/generic';

interface Props {
  item: Item;
}

const getBadges = (item: Item) => {
  if (item.badges) {
    if (item.badges.length >= 1) {
      const newBadges: any = {};
      for (let i = 0; i < item.badges.length; i++) {
        const badgeName = getBadgeTypeFromDb(item.badges[i].name);
        if (newBadges[badgeName]) {
          newBadges[badgeName] = newBadges[badgeName] + 1;
        } else {
          newBadges[badgeName] = 1;
        }
      }
      return newBadges;
    }
  }
  return null;
}

const getDrawDimensions = (item: Item, width: number, height: number) => {
  const draw = JSON.parse(item.content);
  draw.width = width;
  draw.height = height;
  return JSON.stringify(draw);
}

const ItemResult: React.FC<Props> = ({ item }: Props) => {
  const [game, dispatch] = useContext<[GameModel, React.Dispatch<Action>]>(GameContext);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [draw, setDraw] = useState<string | null>(null);
  const [badges, setBadges] = useState<any>(null);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [avatar, setAvatar] = useState<AvatarModel|null>(null);
  const drawResultRef = useRef<any>(null);
  const { width: windowWidth, isMobile } = useWindowResolution();

  useEffect(() => {
    if (drawResultRef) {
      const width = drawResultRef.current.offsetWidth;
      const height = drawResultRef.current.offsetWidth / 1.5;

      // On mobile, check if div has definitive width.
      // Otherwise the div is too little, the canvas get this size and doesn't refresh.
      if (isMobile && width > windowWidth / 2) {
        setCanvasWidth(width);
        setCanvasHeight(height);
        setDraw(getDrawDimensions(item, width, height));
      }

      setCanvasWidth(width);
      setCanvasHeight(height);
      setDraw(getDrawDimensions(item, width, height));
    }
  }, [drawResultRef.current?.offsetWidth, item, windowWidth]);

  useEffect(() => {
    setBadges(getBadges(item));
  }, [item.badges])

  useEffect(() => {
    setAvatar(JSON.parse(item.userGame.user.avatar.toString()));
  }, [item.userGame.user.avatar])

  // const addBadge = (badge: BADGE_TYPE) => {
  //   let count = 1;
  //   if (badges && badges[badge]) {
  //     count = badges[badge] + 1;
  //   }
  //   setBadges({
  //     ...badges,
  //     [badge]: count,
  //   });
  // }

  const onDrop = (e: any) => {
    e.preventDefault();
    setIsFocus(false);
    const badge = JSON.parse(e.dataTransfer.getData('Badge'));
    // addBadge(badge);

    game.socket.emit('sendBadge', {
      gameId: game.id,
      itemId: item.id,
      name: badge.toUpperCase(),
    });

    dispatch({
      type: SET_PLAYER_BADGES,
      payload: {
        ...game.badges,
        [badge]: false,
      },
    });
  }

  const onDragOver = (e: any) => {
    e.preventDefault();
    setIsFocus(true);
  }

  const onDragLeave = (e: any) => {
    e.preventDefault();
    setIsFocus(false);
  }

  const style = {
    opacity: isFocus ? '.75' : undefined,
  }

  return (
    <div
      className="draw-results"
      style={style}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      ref={drawResultRef}
    >
      { avatar && (
        <Avatar
          color={avatar.color}
          head={avatar.head}
          mouth={avatar.mouth}
          size={44}
        />
      )}

      <div className="draw-results-draw">
        <Canvas
          height={canvasHeight}
          width={canvasWidth}
          disabled
          defaultDrawing={draw || undefined}
          immediateDrawing
        />
        {
          badges
            ? (
              <div className="badges-container">
                {Object.keys(badges).map((badge) => (
                  <Badge
                    key={`badge_${badge}_key`}
                    counter={badges[badge]}
                    type={badge as BADGE_TYPE}
                  />
                ))}
              </div>
            )
            : null
        }
      </div>
    </div>
  )
}

export default ItemResult;
