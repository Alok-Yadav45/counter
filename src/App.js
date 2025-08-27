import React, { useState , useEffect , useRef } from "react";
import './App.css';

const App = () => {
  const [counters, setCounters] = useState([]);

  
  const handleAddCounter = () => {
    setCounters([...counters, { id: Date.now(), count: 0, running: false}]);
  };

    const intervalIds = useRef({}); 

  const handleStartCounter = (id) => {
    setCounters((prev) =>
      prev.map((counter) =>
        counter.id === id ? { ...counter, running: true } : counter
      )
    );
    intervalIds.current[id] = setInterval(() => {
      setCounters((prevCounters) =>
        prevCounters.map((c) =>
          c.id === id ? { ...c, count: c.count + 1 } : c
        )
      );
    }, 1000);
  };

 const handleStopCounter = (id) => {
    clearInterval(intervalIds.current[id]);
    intervalIds.current[id] = null;
    setCounters((prev) =>
      prev.map((counter) =>
        counter.id === id ? { ...counter, running: false } : counter
      )
    );
  };


  
  useEffect(() => {
  return () => {
    Object.values(intervalIds.current).forEach(id => id && clearInterval(id));
  };
}, []);

  const totalCount = counters.reduce((sum, counter) => sum + counter.count, 0);
  return (
    <div className="App">
      <div className="App-header">
        <button className='btn-1' onClick={handleAddCounter}>Add Counter</button>
        <button className='btn-2'>{totalCount}</button>
      </div>
      <ul className="counter-list">
        {counters.map((counter) => (
          <li key={counter.id}>
            <div className="counter">
              {!counter.running ? (
               <button onClick={() => handleStartCounter(counter.id)}>
                 Start Count 
               </button>
              ) : (
               <button onClick={() => handleStopCounter(counter.id)}>
                 Stop Count
               </button>
              )}
              <span>{counter.count}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;