import {useEffect, useState} from 'react';
import Board from '../Board/Board';
import Menu from '../Board/Menu';

/* A level will consist of two boards
one will be a board without functionality -> just for show / idle
the other will be the actual game board 

The visual/idle board will show random cards and the cards will flip in an interval sequentially
When hovered, it will show a start button and when clicked, idle board will disappear.
*/
function Level() {
  const [winLose, setWinLose] = useState(null);
  const [level, setLevel] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [lives, setLives] = useState(3);

  const startNumber = 4;
  const maxNumber = level === 0 ? startNumber : startNumber + level;

  useEffect(() => {
    if (winLose === 1) {
      setLevel((prevLevel) => prevLevel + 1);
    } else if (winLose === 0) {
      setLevel(0);
      setLives(3);
    }
    setGameStart(false);
  }, [winLose]);

  useEffect(() => {
    if (winLose !== null) {
      setWinLose(null);
    }
  }, [winLose]);

  return (
    <>
      {!gameStart && (
        <Menu setGameStart={setGameStart} level={level + 1} maxNumber={maxNumber} />
      )}
      {gameStart && (
        <Board level={level + 1} maxNumber={maxNumber} setWinLose={setWinLose} lives={lives} setLives={setLives} />
      )}
    </>
  )
}

export default Level;