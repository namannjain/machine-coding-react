// src/hooks/useFetchData.js
import { useState, useEffect } from 'react';

const STATE = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
};

const useFetchData = (url) => {
  const [status, setStatus] = useState(STATE.LOADING);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setStatus(STATE.SUCCESS);
      } catch (error) {
        setData(null);
        setStatus(STATE.ERROR);
      }
    };

    fetchData();
  }, [url]);

  return { data, status };
};

export default useFetchData;
