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
        const keyItemRight = board.flat().find(el => el.letter === letter && el.color === 'green');
        const keyItemOther = board.flat().find(el => el.letter === letter && el.color);
        const keyItem = keyItemRight || keyItemOther;
        return keyItem?.color;
    }
    return (
        letters.map((letter, i) => (
            <button key={i}
                className={`${s.keyboardKey} ${s[setKeyColor(letter)]}` }
                onClick={() => { hadleClick(letter) }}>
                {letter}
            </button>
        ))
     
    );
};
export default KeyboardRow