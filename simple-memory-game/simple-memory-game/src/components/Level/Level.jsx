import { useState } from 'react';
import './Level.css';
import Board from '../Board/Board';


function Level({ started, setStarted, level=0 }) {
  const [showAllCards, setShowAllCards] = useState(true);

  const startNumber = 4;
  let maxNumber;
  if (level === 0) {
    maxNumber = startNumber;
  } else {
    maxNumber = startNumber + level;
  }

  return (
    <>
      <div className={`level lvl-${level}`}>
        <Board started={started} setStarted={setStarted} maxNumber={maxNumber} />
      </div>
    </>
  )
}

export default Level;