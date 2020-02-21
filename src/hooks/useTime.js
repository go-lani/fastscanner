import { useState, useEffect } from 'react';

const useTime = value => {
  const [time, setTime] = useState([]);

  useEffect(() => {
    const result = value.reduce((pre, cur, idx) => {
      const hour = Math.floor(value[idx] / 2);
      const minute = value[idx] % 2 ? '30' : '00';
      const resultTime =
        hour < 10 ? `0${hour}시 ${minute}분` : `${hour}시 ${minute}분`;
      const resultFormat =
        hour < 10 ? `0${hour}:${minute}` : `${hour}:${minute}`;
      pre.push(resultTime);
      pre.push(resultFormat);

      return pre;
    }, []);

    setTime(result);
  }, [value]);

  return time;
};

export default useTime;
