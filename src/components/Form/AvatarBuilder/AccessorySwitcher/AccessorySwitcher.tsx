import React, { useEffect, useState } from 'react';
import './AccessorySwitcher.scss';
import leftArrow from '../../../../assets/img/left-arrow.png';
import rightArrow from '../../../../assets/img/right-arrow.png';

interface Props {
  icons: string[];
  onChange: (value: string) => void;
}

const AccessorySwitcher: React.FC<Props> = ({ icons, onChange }: Props) => {
  const [index, setIndex] = useState(0);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    if (shouldUpdate) {
      onChange(icons[index]);
      setShouldUpdate(false)
    }
  }, [index, shouldUpdate])

  const previous = () => {
    if (index > 0) {
      setIndex(prevState => prevState - 1);
    } else {
      setIndex(icons.length - 1);
    }
    setShouldUpdate(true)
  }

  const next = () => {
    if (index < (icons.length - 1)) {
      setIndex(prevState => prevState + 1);
    } else {
      setIndex(0);
    }
    setShouldUpdate(true)
  }

  return (
    <>
      <span onClick={previous} onKeyPress={previous} role="button" tabIndex={0} className="arrow">
        <img src={leftArrow} alt="" />
      </span>

      <span onClick={next} onKeyPress={next} role="button" tabIndex={0} className="arrow">
        <img src={rightArrow} alt="" />
      </span>
    </>
  )
}

export default AccessorySwitcher;
