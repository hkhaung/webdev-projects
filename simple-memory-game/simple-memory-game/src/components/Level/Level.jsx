import './Level.css';
import Board from '../Board/Board';

function TimerBar() {

}

function Level() {
  return (
    <>
      <div className='level-container'>
        <TimerBar />
        <Board />
      </div>
    </>
  )
}

export default Level;