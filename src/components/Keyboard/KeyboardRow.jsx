import { useDispatch, useSelector } from 'react-redux';
import s from './Keyboard.module.scss';
import { setLetter } from '../../redux/wordleSlice';
import { useEffect } from 'react';

const KeyboardRow = ({ letters }) => {
    const dispatch = useDispatch();
    const {board} = useSelector(state => state.wordle);
    useEffect(()=>{
        const handleKey = (e) =>{
            if (e.key.match(/^[A-z]$/)) {
                dispatch(setLetter(e.key));
            } 
        }
        window.addEventListener('keyup', handleKey)
        return () => {
            window.removeEventListener('keyup', handleKey)
        }
    },[board])
    const hadleClick = (letter) => {
        dispatch(setLetter(letter));
    }
    const setKeyColor = (letter) => {
        const keyItem = board.flat().find(el => el.letter === letter);
        if(keyItem){
            return keyItem.color;
        }
    }
    return (
        <div className={s.row}>
            {letters.map((letter, i) => (

                <button key={i}
                    className={`${s.keyboardKey} ${s[setKeyColor(letter)]}` }
                    onClick={() => { hadleClick(letter) }}>
                    {letter}
                </button>
            ))}
        </div>
    );
};
export default KeyboardRow