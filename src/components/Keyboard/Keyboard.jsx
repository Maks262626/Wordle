import s from './Keyboard.module.scss';
import w from '../Board/Board.module.scss';
import { deleteLetter, incrementWordLine, setColors, setIsLose, setIsWin } from '../../redux/wordleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import deleteIcon from '../../assets/deleteIcon.svg';
import KeyboardRow from './KeyboardRow';
import { incrementLoses, incrementWins, setStatsActive } from '../../redux/statsSlice';
import { checkWordInDict } from '../../utils/wordle';


const Keyboard = () => {
    const {word,wordLine,board,isWin,attemps,wordLength,isLose} = useSelector(state => state.wordle);
    
    const dispatch = useDispatch();
    const getGuessedWord = () =>{
        return board[wordLine]?.map(cell=>cell.letter).join("").toLowerCase();
    }
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
    const checkWin = (guessWord) =>{
        return word === guessWord; 
    }
    const checkLose = () => {
        return wordLine===attemps-1;
    }
    const hadleClickEnter = () => {
        if (!isWin && !isLose) {
            const guessWord = getGuessedWord();
            const isInDict = checkWordInDict(guessWord);
            if(guessWord.length === wordLength && isInDict){
                dispatch(setColors(guessWord));
                dispatch(incrementWordLine());
                if(checkWin(guessWord)){
                    dispatch(setIsWin(true));
                    dispatch(incrementWins());
                    dispatch(setStatsActive(true));
                }
                else if(checkLose()){
                    dispatch(setIsLose(true));
                    dispatch(incrementLoses());
                    dispatch(setStatsActive(true));
                }
            }
            else {
                setIncorrectAnimation();
            }
        }
    }
    const hadleClickDelete = () => {
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
            {keyboardLayout.map((row, rowIndex) => (
                <KeyboardRow key={rowIndex} letters={row} />
            ))}
            <div className={s.row}>
                <div
                    className={s.keyboardKey}
                    onClick={hadleClickEnter}>
                    Enter
                </div>
            </div>
            <div className={s.row}>
                <div
                    className={`${s.keyboardKey} ${s.deleteBtn}`}
                    onClick={hadleClickDelete}>
                    <img src={deleteIcon} alt="deleteIcon" />
                </div>
            </div>
        </div>
    );
};

export default Keyboard;
