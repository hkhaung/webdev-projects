import {useEffect, useState, useMemo, useRef, useCallback} from 'react';
import './Board.css';
import {generateInitialValues} from "./helpers.js";


// Board component will just have game logic instead of both game and menu logic
// menu logic will be in a separate component that is similar to board component
// losing lives/going to the next level will be all done in Board component
// we will have a component that calls Board and Menu components

function TimerBar({isVisible}) {
  return (
    <div className={`timerbar ${isVisible ? 'visible' : 'hidden'}`}>
      <div></div>
    </div>
  );
}

function Card({text, isVisible, showAllCards, maxNumber, prevCardFlipped, setBoardVisible, setLives, setPrevCardFlipped, setLevelComplete}) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    setIsFlipped((prev) => !prev);
    if ((prevCardFlipped === null && text === 1) || (prevCardFlipped + 1 === text)) {
      if (prevCardFlipped + 1 === maxNumber) {
        setBoardVisible(false);
        setLevelComplete(true);
      } else {
        setPrevCardFlipped(text);
      }
    } else {
      setBoardVisible(false);
      setLives((prevLives) => (prevLives > 0 ? prevLives - 1 : 0));
      setPrevCardFlipped(null);
    }
  }

  return (
    <>
      {showAllCards && (
        <div className='card'>
          {isVisible ? <div>{text}</div> : <div className={`${isFlipped ? 'visible' : 'hidden'}`}>{text}</div>}
        </div>
      )}
      {!showAllCards && (
        <div className='card' onClick={handleFlip}>
          {isVisible ? <div>{text}</div> : <div className={`${isFlipped ? 'visible' : 'hidden'}`}>{text}</div>}
        </div>
      )}
    </>
  );
}


  function Board({level, maxNumber, setWinLose, lives, setLives}) {
    const [visibleTimer, setVisibleTimer] = useState(true);
    const [boardVisible, setBoardVisible] = useState(true);
  const [showAllCards, setShowAllCards] = useState(true);
  const [prevCardFlipped, setPrevCardFlipped] = useState(null);
  const [levelComplete, setLevelComplete] = useState(false);

  function handleLives() {
    setVisibleTimer(true);
    setBoardVisible(true);
    setShowAllCards(true);
    setPrevCardFlipped(null);
  }

  function restart() {
    setWinLose(0);
  }

  function nextLevel() {
    setWinLose(1);
  }

  // Generate initial card values
  const totalCells = 36;
  const [gridArray, setGridArray] = useState([]);
  useEffect(() => {
    const initialValues = generateInitialValues(totalCells, maxNumber);
    setGridArray(initialValues.gridArray);
  }, [maxNumber, boardVisible]);

  // Handle showing all cards at the beginning of the level
  useEffect(() => {
    if (showAllCards) {
      setTimeout(() => {
        setShowAllCards(false);
        setVisibleTimer(false);
      }, 10000);
    }
  }, [showAllCards]);

  return (
    <>
      {boardVisible && (
        <>
          <TimerBar isVisible={visibleTimer}/>
          <div className='board'>
            <div className='grid-container'>
              {gridArray.map((value, index) => (
                <div key={index} className={`grid-item`}>
                  <Card
                    text={value}
                    isVisible={showAllCards}
                    showAllCards={showAllCards}
                    maxNumber={maxNumber}
                    prevCardFlipped={prevCardFlipped}
                    setBoardVisible={setBoardVisible}
                    setLives={setLives}
                    setLevelComplete={setLevelComplete}
                    setPrevCardFlipped={setPrevCardFlipped}
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
              {lives > 0 ? (
                <button onClick={handleLives}>Continue</button>
              ) : (
                <>
                  <div>Highest level completed: {level === 1 ? level : level - 1}</div>
                  <button onClick={restart}>Restart</button>
                </>
              )}
            </div>
          )}
          {levelComplete && (
            <div className='lives-container'>
              <div>Level {level} Complete!</div>
              <div>Lives Left: {lives}</div>
              <button onClick={nextLevel}>Continue</button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Board;