import './App.scss'
import { useEffect } from 'react'
import Header from './components/Header/Header';
import Board from './components/Board/Board';
import Keyboard from './components/Keyboard/Keyboard';
import { useDispatch, useSelector } from 'react-redux';
import Stats from './components/Stats/Stats';
import { setIsGameInitialized } from './redux/statsSlice';
import { resetGame } from './redux/wordleSlice';
import Word from './components/Word/Word';

function App() {
  const dispatch = useDispatch();
  const {isGameInitialized} = useSelector(state => state.stats);
  const {isLose} = useSelector(state => state.wordle);

  useEffect(()=>{
      if(!isGameInitialized){
        dispatch(resetGame());
        dispatch(setIsGameInitialized(true));
      }
  },[])

  return (
    <div className='wrapper'>
      <Header/>
      <Stats/>
      <div className='gameWrapper'>
        {isLose && <Word/>}
        <Board/>
        <Keyboard/>
      </div>
    </div>
  )
}

export default App
