import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
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

function Card( { text, maxNumber, isVisible=true, prevCardFlipped, setBoardVisible, setLives, setLevelComplete } ) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    setIsFlipped((prev) => !prev);

    if (prevCardFlipped.current === null && text === 1 || (prevCardFlipped.current + 1 === text)) {
      if (prevCardFlipped.current + 1 === maxNumber) {
        setBoardVisible(false);
        setLevelComplete(true);
      }
      prevCardFlipped.current = text;
    } else {
      setLives((prevLives) => (prevLives > 0 ? prevLives - 1 : 0));
      setBoardVisible(false);
      prevCardFlipped.current = null;
    }
    
    return prevCardFlipped;
  }

  return (
    <>
    {isVisible && (
      <div className='card'>
        {text}
      </div>
    )}

    {!isVisible && (
      <div className='card' onClick={handleFlip}>
        <div className={`${isFlipped ? 'visible' : 'hidden'}`}>{text}</div>
      </div>
    )}
    </>
  );
}

function Board({ level, maxNumber, setWinLose }) {
  function handleStart() {
    setIsFlipping(false);
    setBoardVisible(true);
    setVisibleTimer(true);
    setGameStarted(true);
    setShowAllCards(true);

    setTimeout(() => {
      setVisibleCard(null);
    }, 10000);
  }

  function handleLives() {
    getNewCardsArray();
    setBoardVisible(true);
    setVisibleTimer(true);
    setShowAllCards(true);
  }

  function restart() {
    setWinLose(0);
  }

  function nextLevel() {
    setWinLose((prev) => prev + 1);
  }

  function generateInitialValues() {
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

    return {gridArray, numberIndices};
  }

  // Generate cardsArray and randomly populate gridArray once using useMemo
  // only recompute if maxNumber or totalCells change
  const totalCells = 36;
  const initialValues = useMemo(generateInitialValues, [maxNumber, totalCells]);

  const [gridArray, setGridArray] = useState(initialValues.gridArray);
  const [numberIndices, setNumberIndices] = useState(initialValues.numberIndices);

  const getNewCardsArray = useCallback(() => {
    const newValues = generateInitialValues();
    setGridArray(newValues.gridArray);
    setNumberIndices(newValues.numberIndices);
  }, [maxNumber, totalCells]);


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
  const prevCardFlipped = useRef(null); // useRef used to prevent double rerenders
  const [visibleTimer, setVisibleTimer] = useState(false);
  useEffect(() => {
    if (gameStarted) {
      setTimeout(() => {
        setVisibleTimer(false);
      }, 10000);
    }
  });

  // game started
  const [gameStarted, setGameStarted] = useState(false);
  const [lives, setLives] = useState(3);
  const [boardVisible, setBoardVisible] = useState(false);
  const [showAllCards, setShowAllCards] = useState(false);
  useEffect(() => {
    if (showAllCards) {
      setTimeout(() => {
        setShowAllCards(false);
      }, 10000);
    }
  });

  const [levelComplete, setLevelComplete] = useState(false);


  return (
    <>
      {!gameStarted && (
        <div className='board'>
          <div className='grid-container hover-enabled'>
            {gridArray.map((value, index) => (
              <div key={index} className={`grid-item ${numberIndices[visibleCard] === index ? 'visible' : 'hidden'}`}>
                <Card text={value} maxNumber={maxNumber} />
              </div>
            ))}
            <button className='start-btn' onClick={handleStart}>Level {level}: Start</button>
          </div>
        </div>
      )}

      {gameStarted && (
        <>
          {boardVisible && (
            <>
              <TimerBar isVisible={visibleTimer} />

              <div className='board'>
                <div className='grid-container'>
                  {gridArray.map((value, index) => (
                    <div key={index} className={`grid-item`}>                    
                      <Card
                        text={value}
                        maxNumber={maxNumber}
                        isVisible={showAllCards}
                        prevCardFlipped={prevCardFlipped}
                        setBoardVisible={setBoardVisible}
                        setLives={setLives}
                        setLevelComplete={setLevelComplete}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!boardVisible && (
            <>
            {!levelComplete && (
                <div className='lives-container'>
                  <div>Lives left: {lives}</div>
                {lives > 0 && (
                    <button onClick={handleLives}>Continue</button>
                )}
                {lives === 0 && (
                    <button onClick={restart}>Restart</button>
                )}
                </div>
            )}

            {levelComplete && (
                <div className='lives-container'>
                  <div>Level Complete!</div>
                  <button onClick={nextLevel}>Continue</button>
                </div>
            )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default Board;