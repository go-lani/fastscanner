import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeviceSaga } from '../redux/modules/util';

// 초기화
const initialState = (() => {
  if (window.innerWidth >= 1025) {
    return 'Desktop';
  } else if (window.innerWidth <= 1024 && window.innerWidth > 769) {
    return 'Tablet';
  } else if (window.innerWidth === 769) {
    return '769';
  } else {
    return 'Mobile';
  }
})();

export default function useDevice() {
  const dispatch = useDispatch();
  const device = useSelector(state => state.util.device);

  const resize = useCallback(() => {
    if (window.innerWidth >= 1025) {
      if (device === 'Desktop') return;

      dispatch(getDeviceSaga('Desktop'));
    } else if (window.innerWidth <= 1024 && window.innerWidth > 769) {
      if (device === 'Tablet') return;

      dispatch(getDeviceSaga('Tablet'));
    } else if (window.innerWidth === 769) {
      if (device === '769') return;

      dispatch(getDeviceSaga('769'));
    } else {
      if (device === 'Mobile') return;

      dispatch(getDeviceSaga('Mobile'));
    }
  }, [device, dispatch]);

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  useEffect(() => {
    dispatch(getDeviceSaga(initialState));
  }, [dispatch]);

  return device;
}
