import { useEffect, useState, useMemo } from 'react';
import './Board.css';

function TimerBar( {isVisible}) {
  return (
    <>
      <div className={`timerbar ${isVisible ? 'visible' : 'hidden'}`}>
        <div></div>
      </div>
    </>
  )
}

function Card( { textNumber='', isVisible=false, setFlippedCards, setBoardVisible } ) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    setIsFlipped(false);

    let isSequential = true;
    setFlippedCards((prevNum) => {
      if (prevNum !== Number(textNumber)) {
        isSequential = false; 
      }

      if (!isSequential) {
        setBoardVisible(false);
      }
      
      prevNum = Number(textNumber);
      return prevNum;
    });
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
    setTimerVisible(true);

    setTimeout(() => {
      setVisibleCard(null);
    }, 10000);

    clearInterval();
  }

  function handleChances() {
    setTimerVisible(false);
    setBoardVisible(true);
    setStarted(true);
    setChancesLeft(chancesLeft - 1);
  }

  const [visibleCard, setVisibleCard] = useState(0);
  const [isFlipping, setIsFlipping] = useState(true);
  const [isHoverActive, setIsHoverActive] = useState(true);

  const [timerVisible, setTimerVisible] = useState(false);
  const [boardVisible, setBoardVisible] = useState(true);
  const [chancesLeft, setChancesLeft] = useState(2);
  const [flippedCardsSequential, setFlippedCardsSequential] = useState(1);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerVisible(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      {timerVisible && (<TimerBar isVisible={timerVisible} />)}

      {boardVisible && (
        <div className='board'>
          <div className={`grid-container ${isHoverActive ? 'hover-enabled' : ''}`}>
            {gridArray.map((value, index) => (
                <div key={index} className={`grid-item`}>
                  <Card
                    textNumber={value ? value.toString() : ''}
                    isVisible={started}
                    setFlippedCards={setFlippedCardsSequential}
                    setBoardVisible={setBoardVisible}
                  />
                </div>
            ))}
            {isHoverActive && (
              <button className="start-btn" onClick={handleStart}>Start</button>
            )}
          </div>
        </div>
      )}

      {!boardVisible && (
        <div className="chances-container">
          {chancesLeft > 0 && (
            <>
              <div>Chances left:{chancesLeft}</div>
              <button onClick={handleChances}>Continue</button>
            </>
          )}
          {chancesLeft === 0 && (
            <>
              <div>Game Over</div>
              <button onClick={handleChances}>Restart</button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Board;