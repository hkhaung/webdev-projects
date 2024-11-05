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
  const [showAllCards, setShowAllCards] = useState(true);
  const [timerVisible, setTimerVisible] = useState(true);

  const startNumber = 4;
  let maxNumber;
  if (level === 0) {
    maxNumber = startNumber;
  } else {
    maxNumber = startNumber + level;
  }

  useEffect(() => {
    if (started) {
      setTimeout(() => {
        setTimerVisible(false);
      }, 10000);
    }
  });

  return (
    <>
      {started && (
        <TimerBar isVisible={timerVisible} />
      )}
      <div className={`level lvl-${level}`}>
        <Board started={started} setStarted={setStarted} maxNumber={maxNumber} />
      </div>
    </>
  )
}

export default Level;