import React, { useContext } from 'react';
import './HistoryResult.scss';
import { GameHistory } from '../../../../../models/GameModel';
import { Item, ItemType } from '../../../../../models/ItemModel';
import Sentence from './Sentence';
import Draw from './Draw';

interface Props {
  gameHistory: GameHistory;
}

const HistoryResult: React.FC<Props> = ({ gameHistory }: Props) => (
  gameHistory.items
    ? (
      <div className="history-result">
        {
          gameHistory.items.map((item: Item, key: number) => (
            item.type === ItemType.SENTENCE
              ? <Sentence key={`history_result_${item.type}_${item.id}`} item={item} />
              : <Draw key={`history_result_${item.type}_${item.id}`} item={item} />
          ))
        }
      </div>
    )
    : <div>No items</div>
)

export default HistoryResult;
