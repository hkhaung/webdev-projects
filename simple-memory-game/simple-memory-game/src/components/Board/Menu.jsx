import { useEffect, useState } from 'react';
import './Board.css';
import { generateInitialValues } from "./helpers.js";

// Menu Component renders the "loading" part
// no game logic
// when start button is clicked, this should hide the component and render
// the actual game board with game logic

function Card({ text }) {
  return (
    <div className='card'>
      <div>{text}</div>
    </div>
  );
}

function Menu({ setGameStart, level, maxNumber }) {
  const [visibleCard, setVisibleCard] = useState(0);
  const totalCells = 36;

  const initialValues = generateInitialValues(totalCells, maxNumber);
  const [gridArray, setGridArray] = useState(initialValues.gridArray);
  const [numberIndices, setNumberIndices] = useState(initialValues.numberIndices);

  useEffect(() => {
    const newValues = generateInitialValues(totalCells, maxNumber);
    setGridArray(newValues.gridArray);
    setNumberIndices(newValues.numberIndices);
  }, [maxNumber]);

  // Handle card flipping and visibility interval
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCard((index) => (index + 1) % numberIndices.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [numberIndices.length]);

  function handleStart() {
    setGameStart(true);
  }

  return (
    <>
      <div className='board'>
        <div className='grid-container hover-enabled'>
          {gridArray.map((value, index) => (
            <div key={index} className={`grid-item ${numberIndices[visibleCard] === index ? 'visible' : 'hidden'}`}>
              <Card text={value} />
            </div>
          ))}
          <button className='start-btn' onClick={handleStart}>Level {level}: Start</button>
        </div>
      </div>
    </>
  );
}

export default Menu;