import { useState, useEffect } from 'react';

const useTime = value => {
  const [time, setTime] = useState(value);
  const [result, setResult] = useState([]);

  useEffect(() => {
    setTime(value);
  }, [value]);

  useEffect(() => {
    const result = time.reduce((pre, cur, idx) => {
      const hour = Math.floor(time[idx] / 2);
      const minute = time[idx] % 2 ? '30' : '00';
      const resultTime =
        hour < 10 ? `0${hour}시 ${minute}분` : `${hour}시 ${minute}분`;
      pre.push(resultTime);

      return pre;
    }, []);

    setResult(result);
    // setTime(result);
  }, [time]);

  return [...result];
};

export default useTime;
