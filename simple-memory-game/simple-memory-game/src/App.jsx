import { useState, useEffect } from 'react';
import './App.css'
import Level from './components/Level/Level';
import Board from './components/Board/Board';

function App() {
  const [winLose, setWinLose] = useState(null);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (winLose >= 1) {
      setLevel((prevLevel) => prevLevel + 1);
    } else if (winLose === 0) {
      setLevel(0);
    }
  }, [winLose]);

  return (
    <>
      {/* <Level key={winLose} level={level} setWinLose={setWinLose} /> */}
      <Board />
    </>
  )
}

export default App;
