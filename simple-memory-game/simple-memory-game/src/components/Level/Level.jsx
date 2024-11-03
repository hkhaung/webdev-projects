import { useState, useEffect } from 'react';
import './Level.css';
import Board from '../Board/Board';


function TimerBar({ isVisible=false }) {
  return (
    <>
      <div className={`timerbar ${isVisible ? 'visible' : 'hidden'}`}>
        <div></div>
      </div>
    </>
  )
}


function Level({ started, setStarted, level=0 }) {
  const startNumber = 4;
  let maxNumber;
  if (level === 0) {
    maxNumber = startNumber;
  } else {
    maxNumber = startNumber + level;
  }

  const [showAllCards, setShowAllCards] = useState(true);

  return (
    <>
      {started && (
        <TimerBar isVisible={showAllCards} />
      )}
      <div className={`level lvl-${level}`}>
        <Board started={started} setStarted={setStarted} maxNumber={maxNumber} />
      </div>
    </>
  )
}

export default Level;