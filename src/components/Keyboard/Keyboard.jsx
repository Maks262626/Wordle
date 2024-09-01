import s from './Keyboard.module.scss';
import w from '../Board/Board.module.scss';
import { deleteLetter, incrementWordLine, setColors, setIsLose, setIsWin } from '../../redux/wordleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import deleteIcon from '../../assets/deleteIcon.svg';
import KeyboardRow from './KeyboardRow';
import { incrementLoses, incrementWins, setStatsActive } from '../../redux/statsSlice';
import { checkLose, checkWin, checkWordInDict, getGuessedWord } from '../../utils/wordle';


const Keyboard = () => {
    const {word,wordLine,board,isWin,attemps,wordLength,isLose} = useSelector(state => state.wordle);
    const dispatch = useDispatch();
    const keyboardLayout = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ];

    const setIncorrectAnimation = () =>{
        const lines = document.querySelectorAll(`.${w.wordLine}`);
        const line = lines[wordLine];
        if (line) {
            line.classList.add(w.inCorrectAnimation);
            setTimeout(() => {
                line.classList.remove(w.inCorrectAnimation);
            }, 1000);
        }
    }

    const hadleClickEnter = () => {
        if(isWin || isLose) return;
        const guessWord = getGuessedWord(board,wordLine);
        const isInDict = checkWordInDict(guessWord);
        if(guessWord.length !== wordLength || !isInDict){
            setIncorrectAnimation();
            return;
        }
        dispatch(setColors(guessWord));
        dispatch(incrementWordLine());
        if(checkWin(word,guessWord)){
            dispatch(setIsWin(true));
            dispatch(incrementWins());
            dispatch(setStatsActive(true));
        }
        else if(checkLose(wordLine,attemps)){
            dispatch(setIsLose(true));
            dispatch(incrementLoses());
            dispatch(setStatsActive(true));
        }
        
    }
    const handleClickDelete = () => {
        dispatch(deleteLetter());
    }
    useEffect(()=>{
        const handleAction = (e) =>{
            if (e.key === 'Backspace' || e.key === 'Delete') {
                dispatch(deleteLetter());
            } 
            if (e.key === 'Enter'){
                hadleClickEnter();
            }
        }
        window.addEventListener('keyup', handleAction)
        return () => {
            window.removeEventListener('keyup', handleAction)
        }
    },[board])
    return (
        <div className={s.keyboard}>
            <div className={`${s.row}`}>
                <KeyboardRow letters={keyboardLayout[0]} />
            </div>
            <div className={`${s.row}`}>
                <div className={`${s.keyboardKey} ${s.keyboardKeyEmpty}`}></div>
                <KeyboardRow letters={keyboardLayout[1]} />
                <div className={`${s.keyboardKey} ${s.keyboardKeyEmpty}`}></div>
            </div>
            <div className={`${s.row}`}>
                <button
                    className={s.keyboardKey}
                    onClick={hadleClickEnter}>
                    Enter
                </button>
                <KeyboardRow letters={keyboardLayout[2]} />
                <button
                    className={`${s.keyboardKey} ${s.deleteBtn}`}
                    onClick={handleClickDelete}>
                    <img src={deleteIcon} alt="deleteIcon" />
                </button>
            </div>
        </div>
    );
};

export default Keyboard;
