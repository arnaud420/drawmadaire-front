import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowLeft from '../../../../assets/img/left-arrow-white.png';
import ArrowRight from '../../../../assets/img/right-arrow-white.png';
import './ResultsSlider.scss';
import { GameHistory } from '../../../../models/GameModel';
import HistoryResult from './HistoryResult';
import { useWindowResolution } from '../../../../hooks/useWindowResolutions';
import { MOBILE_WIDTH } from '../../../../config/generic';

const MAX_COLUMNS = 2;

interface Props {
  gameHistories: GameHistory[],
}

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <img src={ArrowRight} alt="arrow right" />
    </div>
  );
}

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <img src={ArrowLeft} alt="arrow left" />
    </div>
  );
}

const ResultsSlider: React.FC<Props> = ({ gameHistories }: Props) => {
  const [slidesToShow, setSlidesToShow] = useState(MAX_COLUMNS);
  const { width } = useWindowResolution()

  useEffect(() => {
    setSlidesToShow(width < MOBILE_WIDTH ? 1 : MAX_COLUMNS);
  }, [width])

  return (
    <div className="players-slider">
      <Slider
        dots
        infinite={false}
        speed={500}
        slidesToShow={slidesToShow}
        slidesToScroll={1}
        nextArrow={<SampleNextArrow />}
        prevArrow={<SamplePrevArrow />}
      >
        {
          gameHistories.map((gameHistory: GameHistory) => (
            <HistoryResult
              key={`history_result__${gameHistory.id}`}
              gameHistory={gameHistory}
            />
          ))
        }
      </Slider>
    </div>
  )
}

export default ResultsSlider
