import { useEffect, useState } from 'react';
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


function Board( {maxNumber=36} ) {
  const cardsArray = Array.from({ length: maxNumber }, (_, i) => i + 1);
  const seenNum = new Set();

  const [visibleCard, setVisibleCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCard(index => (index + 1) % maxNumber);
    }, 3000);

    return () => clearInterval(interval);
  }, [maxNumber])
  
  const showCard = (index) => {
    setVisibleCard(index);
  };

  return (
    <div className='board'>
      <div className='grid-container'>
        {cardsArray.map(() => {
          let randomNum;
          do {
            randomNum = Math.floor(Math.random() * maxNumber) + 1;
          } while (seenNum.has(randomNum));

          seenNum.add(randomNum);

          return (
            <div key={randomNum - 1} className={`grid-item ${visibleCard === randomNum - 1 ? 'visible' : 'hidden'}`}>
              <Card textNumber={randomNum.toString()} />
            </div>
          );
        })}
        <button className='start-btn'>Start</button>
      </div>
    </div>
  );
}

export default Board;