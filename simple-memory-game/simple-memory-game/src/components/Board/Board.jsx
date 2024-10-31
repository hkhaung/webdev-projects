import { useEffect, useState, useMemo } from 'react';
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

function TimerBar({ isVisible=false }) {
  return (
    <>
      <div className={`timerbar ${isVisible ? 'visible' : 'hidden'}`}>
        <div></div>
      </div>
    </>
  )
}

function Board({ maxNumber=4, totalCells=36 }) {
  const [visibleCard, setVisibleCard] = useState(0);
  const [isFlipping, setIsFlipping] = useState(true);
  const [isHoverActive, setIsHoverActive] = useState(true);
  
  const [showAllCards, setShowAllCards] = useState(false);
  const [timerBarVisible, setTimerBarVisible] = useState(false);

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


  function handleStart() {
    setIsFlipping(false);
    setShowAllCards(true);
    setTimerBarVisible(true);
    setIsHoverActive(false);

    setTimeout(() => {
      setShowAllCards(false);
      setTimerBarVisible(false);
      setVisibleCard(null);
    }, 10000);

    clearInterval();
  }

  return (
    <div>
      <TimerBar isVisible={timerBarVisible} />

      <div className='board'>
        <div className={`grid-container ${isHoverActive ? 'hover-enabled' : 'game-started'}`}>
          {gridArray.map((value, index) => (
            <div key={index} className={`grid-item ${showAllCards || numberIndices[visibleCard] === index ? 'visible' : 'hidden'}`}>
              <Card textNumber={value ? value.toString() : ''} />
            </div>
          ))}
          {isHoverActive && (
            <button className="start-btn" onClick={handleStart}>Start</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Board;