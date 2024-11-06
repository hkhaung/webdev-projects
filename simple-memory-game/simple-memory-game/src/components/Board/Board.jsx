import { useEffect, useState, useMemo } from 'react';
import './Board.css';

function TimerBar({ isVisible=false }) {
  return (
    <>
      <div className={`timerbar ${isVisible ? 'visible' : 'hidden'}`}>
        <div></div>
      </div>
    </>
  )
}

function Card( { textNumber='', isVisible=true } ) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    setIsFlipped((prev) => !prev);
  }

  return (
    <>
    {isVisible && (
      <div className='card'>
        {textNumber}
      </div>
    )}

    {!isVisible && (
      <div className='card' onClick={handleFlip}>
        <div className={`${isFlipped ? 'visible' : 'hidden'}`}>{textNumber}</div>
      </div>
    )}
    </>
  );
}

function Board({ maxNumber, setWinLose }) {
  function handleStart() {
    setIsFlipping(false);
    setVisibleTimer(true);
    setGameStarted(true);
    setShowAllCards(true);

    setTimeout(() => {
      setVisibleCard(null);
    }, 10000);

    clearInterval();
  }

  // Generate cardsArray and randomly populate gridArray once using useMemo
  // only recompute if maxNumber or totalCells change
  const totalCells = 36;
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


  const [gameStarted, setGameStarted] = useState(false);
  
  // visual board + interval
  const [visibleCard, setVisibleCard] = useState(0);
  const [isFlipping, setIsFlipping] = useState(true);
  useEffect(() => {
    if (!isFlipping) return;

    const interval = setInterval(() => {
      setVisibleCard((index) => (index + 1) % numberIndices.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isFlipping, numberIndices.length]);

  // timer
  const [visibleTimer, setVisibleTimer] = useState(false);
  useEffect(() => {
    if (gameStarted) {
      setTimeout(() => {
        setVisibleTimer(false);
      }, 10000);
    }
  });

  // game started
  const [showAllCards, setShowAllCards] = useState(false)
  useEffect(() => {
    if (showAllCards) {
      setTimeout(() => {
        setShowAllCards(false);
      }, 10000);
    }
  })

  return (
    <>
      {!gameStarted && (
        <div className='board'>
          <div className='grid-container hover-enabled'>
            {gridArray.map((value, index) => (
              <div key={index} className={`grid-item ${numberIndices[visibleCard] === index ? 'visible' : 'hidden'}`}>
                <Card
                  textNumber={value ? value.toString() : ''}
                />
              </div>
            ))}
            <button className='start-btn' onClick={handleStart}>Start</button>
          </div>
        </div>
      )}

      {gameStarted && (
        <>
          <TimerBar isVisible={visibleTimer} />

          <div className='board'>
            <div className='grid-container'>
              {gridArray.map((value, index) => (
                <>
                  <div key={index} className={`grid-item`}>                    
                    <Card
                      textNumber={value ? value.toString() : ''}
                      isVisible={showAllCards}
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Board;