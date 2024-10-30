import { useEffect, useState, useMemo } from 'react';
import './Board.css';

function Card( {textNumber='0'} ) {
  return (
    <>
      <div className='card'>
        {textNumber}
      </div>
    </>
  )
}

function TimerBar() {
  return (
    <>
      <div className='timerbar'>
        <div></div>
      </div>
    </>
  )
}

function Board({ maxNumber=36 }) {
  const [visibleCard, setVisibleCard] = useState(0);
  const [isFlipping, setIsFlipping] = useState(true);
  const [showAllCards, setShowAllCards] = useState(false);

  const cardsArray = useMemo(() => {
    const seenNum = new Set();
    return Array.from({ length: maxNumber }, () => {
      let randomNum;
      do {
        randomNum = Math.floor(Math.random() * maxNumber) + 1;
      } while (seenNum.has(randomNum));
      
      seenNum.add(randomNum);
      return randomNum;
    });
  }, [maxNumber]);

  useEffect(() => {
    if (!isFlipping) return;

    let interval = setInterval(() => {
      setVisibleCard((index) => (index + 1) % maxNumber);
    }, 3000);
  
    return () => clearInterval(interval);
  }, [isFlipping, maxNumber]);

  function handleStart() {
    setIsFlipping(false);
    setShowAllCards(true);
    setTimeout(() => {
      setIsFlipping(true);
      setShowAllCards(false);
    }, 10000);
  }

  return (
    <div>
      <TimerBar />

      <div className='board'>
        <div className='grid-container'>
          {cardsArray.map((randomNum) => (
            <div
              key={randomNum - 1}
              className={`grid-item ${showAllCards || visibleCard === randomNum - 1 ? 'visible' : 'hidden'}`}
            >
              <Card textNumber={randomNum.toString()} />
            </div>
          ))}
          <button className="start-btn" onClick={handleStart}>Start</button>
        </div>
      </div>
    </div>
  );
}

export default Board;