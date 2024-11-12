import {useState, useEffect, useCallback} from 'react';
import './App.css'
import Level from './components/Level/Level';

function App() {
  const [winLose, setWinLose] = useState(null);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    console.log(winLose);
    if (winLose >= 1) {
      console.log('hey', level);
      setLevel((prevLevel) => prevLevel + 1);
      console.log('hey1', level);
    } else if (winLose === 0) {
      setLevel(0);
    }
  }, [winLose]);

  return (
    <>
      <Level key={winLose} level={level} setWinLose={setWinLose} />
    </>
  )
}

export default App;
