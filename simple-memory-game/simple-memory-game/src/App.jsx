import { useState, useEffect } from 'react';
import './App.css'
import Level from './components/Level/Level';

function App() {
  const [winLose, setWinLose] = useState(null);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (winLose === 1) {
      setLevel((prevLevel) => prevLevel + 1);
    }
  }, [winLose]);

  return (
    <>
      <Level level={level} setWinLose={setWinLose} />
    </>
  )
}

export default App;
