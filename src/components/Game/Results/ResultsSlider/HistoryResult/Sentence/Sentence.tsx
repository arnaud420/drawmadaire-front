import React from 'react';
import { Item } from '../../../../../../models/ItemModel';
import { Avatar } from '../../../../../common/Avatar';
import './Sentence.scss';

interface Props {
  item: Item;
}

const Sentence: React.FC<Props> = ({ item }: Props) => {
  const avatar = JSON.parse(item.userGame.user.avatar.toString());

  return (
    <div className="sentence-content">
      <Avatar
        color={avatar.color}
        head={avatar.head}
        mouth={avatar.mouth}
        size={44}
      />
      <div>{item.content}</div>
    </div>
  )
}

export default Sentence;
