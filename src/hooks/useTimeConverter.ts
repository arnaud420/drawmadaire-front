import { useEffect, useState } from 'react';

export const useTimeConverter = (timeInSeconds: number) => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    setMinutes(Math.floor(timeInSeconds / 60));
    setSeconds(timeInSeconds % 60);
  }, [timeInSeconds]);

  return { minutes, seconds }
}
