import { useEffect, useState } from 'react';
import './Board.css';

function Card( { textNumber='0' } ) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    setIsFlipped((prev) => !prev);
  }

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-inner">
        <div className="card-front">{textNumber}</div>
        <div className="card-back"></div>
      </div>
    </div>
  )
}

function Board({ started, setStarted, maxNumber=4, totalCells=36 }) {
  function handleStart() {
    setIsFlipping(false);
    setIsHoverActive(false);
    setVisibleCard(null);
    setStarted(true);

    clearInterval();
  }

  const [visibleCard, setVisibleCard] = useState(0);
  const [isFlipping, setIsFlipping] = useState(true);
  const [isHoverActive, setIsHoverActive] = useState(true);

  const cardsArray = Array.from({ length: maxNumber }, (_, i) => i + 1);
  const gridArray = Array.from({ length: totalCells }, () => null);
  const numberIndices = [];

  cardsArray.forEach((number) => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * totalCells);
    } while (gridArray[randomIndex] !== null);

    gridArray[randomIndex] = number;
    numberIndices.push(randomIndex);
  });

  useEffect(() => {
    if (!isFlipping) return;

    const interval = setInterval(() => {
      setVisibleCard((index) => (index + 1) % numberIndices.length);
    }, 3000);
  
    return () => clearInterval(interval);
  }, [isFlipping, numberIndices.length]);


  return (
    <>
      {!started && (
        <div className='board'>
          <div className={`grid-container ${isHoverActive ? 'hover-enabled' : ''}`}>
            {gridArray.map((value, index) => (
              <div key={index} className={`grid-item ${numberIndices[visibleCard] === index ? 'visible' : 'hidden'}`}>
                <Card textNumber={value ? value.toString() : ''} />
              </div>
            ))}
            {isHoverActive && (
              <button className="start-btn" onClick={handleStart}>Start</button>
            )}
          </div>
        </div>
      )}

      {started && (
        <div className='board'>
          <div className={`grid-container`}>
            {gridArray.map((value, index) => (
              <div key={index} className={`grid-item`}>
                <Card textNumber={value ? value.toString() : ''} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Board;