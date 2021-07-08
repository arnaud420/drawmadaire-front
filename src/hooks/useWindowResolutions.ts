import { useEffect, useState } from 'react';
import { MOBILE_WIDTH } from '../config/generic';

export const useWindowResolution = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  window.addEventListener('resize', handleResize);

  useEffect(() => () => {
    window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMobile(width <= MOBILE_WIDTH);
  }, [width])

  return {
    width,
    height,
    isMobile,
  };
};
