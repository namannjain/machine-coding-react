import React, { useEffect, useRef, useState } from 'react'

const STATE = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
}

function TypeAhead() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  //status can be - error, loading, success (instead of making 3 different useState we are making use of just one)
  const [status, setStatus] = useState(STATE.LOADING);
  const cache = useRef({});

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async () => {
      try {
        setStatus(STATE.LOADING);
        if (cache.current[query]) {
          console.log("Retrived from Cache");
          setResults(cache.current[query]);
          setStatus(STATE.SUCCESS);
          return;
        }

        const res = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=10`, {signal});
        const data = await res.json();
        setResults(data.products);
        setStatus(STATE.SUCCESS);
        cache.current[query] = data.products;
      } catch (error) {
        if (error.name !== "AbortError") {
          setStatus(STATE.ERROR);
        }
      }
    };

    //debouncing
    const timerId = setTimeout(fetchData, 1000);
    //cleanup function of useEffect
    return () => {
      clearTimeout(timerId);
      abortController.abort();
    }

  }, [query])

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      
      {status === STATE.LOADING && <div>...Loading</div> }
      {status === STATE.ERROR && <div>Error fetching data</div> }
      {status === STATE.SUCCESS && (
        <ul>
          {results.map((product) => {
            return <li key={product.id}>{product.title}</li>
          })}
        </ul>
      )}

    </div>
  )
}

export default TypeAhead