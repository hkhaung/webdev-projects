import { useEffect, useState, useMemo } from 'react';
import './Board.css';

function Card( { textNumber='', isVisible=false } ) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    setIsFlipped((prev) => !prev);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`card`}
      onClick={handleFlip}
    >
      {!isVisible && (<div>{textNumber}</div>)}
      {isVisible && (
        <div className={`${isFlipped ? 'hidden' : 'visible'}`}>
          {textNumber}
        </div>
      )}
    </div>
  );
}

function Board({ started, setStarted, maxNumber=4, totalCells=36 }) {
  function handleStart() {
    setIsFlipping(false);
    setIsHoverActive(false);
    setStarted(true);

    setTimeout(() => {
      setVisibleCard(null);
    }, 10000);

    clearInterval();
  }

  const [visibleCard, setVisibleCard] = useState(0);
  const [isFlipping, setIsFlipping] = useState(true);
  const [isHoverActive, setIsHoverActive] = useState(true);

  // Generate cardsArray and randomly populate gridArray once using useMemo
  // only recompute if maxNumber or totalCells change
  const { gridArray, numberIndices } = useMemo(() => {
    const cardsArray = Array.from({ length: maxNumber }, (_, i) => i + 1);
    const gridArray = Array.from({ length: totalCells }, () => null);
    const numberIndices = []; // Store indices where numbers are placed to be used for visibility

    cardsArray.forEach((number) => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * totalCells);
      } while (gridArray[randomIndex] !== null);

      gridArray[randomIndex] = number;
      numberIndices.push(randomIndex);
    });

    return { gridArray, numberIndices };
  }, [maxNumber, totalCells]);


  useEffect(() => {
    if (!isFlipping) return;

    const interval = setInterval(() => {
      setVisibleCard((index) => (index + 1) % numberIndices.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isFlipping, numberIndices.length]);


  return (
    <>
      <div className='board'>
        <div className={`grid-container ${isHoverActive ? 'hover-enabled' : ''}`}>
          {gridArray.map((value, index) => (
              <div key={index} className={`grid-item`}>
                  <Card
                    textNumber={value ? value.toString() : ''}
                    isVisible={started}
                  />
              </div>
          ))}
          {isHoverActive && (
            <button className="start-btn" onClick={handleStart}>Start</button>
          )}
        </div>
      </div>
    </>
  );
}

export default Board;