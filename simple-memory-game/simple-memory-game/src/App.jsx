import { useState, useEffect } from 'react';
import './App.css'
import Level from './components/Level/Level';
import Board from './components/Board/Board';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(0);

  return (
    <>
      {/* <div className={`menu ${gameStarted} ? 'display-none' : ''`}>
        <Board
          started={gameStarted}
          setStarted={setGameStarted}
          maxNumber={18}
          totalCells={36}
        />
      </div> */}

      <div className='game'>
        {/* {gameStarted && (
          <Level started={gameStarted} setStarted={setGameStarted} level={level} />
        )} */}
        <Level started={gameStarted} setStarted={setGameStarted} level={level} />
      </div>
    </>
  )
}

export default App;
