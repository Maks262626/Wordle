import { createSlice } from '@reduxjs/toolkit'
import { getRandomWord } from '../utils/wordle';
const initialState = {
    word: '',
    attemps: 6,
    wordLength: 5,
    board: [],
    isWin: false,
    isLose: false,
    wordLine: 0
}

const savedWordle = localStorage.getItem('wordle');
const savedWordleState = savedWordle ? JSON.parse(savedWordle) : initialState;
export const wordleSlice = createSlice({
    name: 'wordle',
    initialState:savedWordleState,
    reducers: {
        setWord: (state, action) => {
            state.word = action.payload
        },
        setBoard: (state, action) => {
            state.board = action.payload
        },
        setIsWin: (state, action) => {
            state.isWin = action.payload
        },
        setIsLose: (state, action) => {
            state.isLose = action.payload
        },
        incrementWordLine: (state) => {
            state.wordLine += 1;
        },
        setLetter: (state, action) => {
            if (!state.isWin && !state.isLose) {
                let wordIndex = state.board[state.wordLine].findIndex(el => el.letter === '');
                if (wordIndex !== -1) {
                    state.board[state.wordLine][wordIndex].letter = action.payload.toUpperCase();
                }
            }
        },
        deleteLetter: (state) => {
            if (!state.isWin && !state.isLose) {
                let deleteIndex = state.board[state.wordLine].findLastIndex(el => el.letter !== '');
                if (deleteIndex !== -1) {
                    state.board[state.wordLine][deleteIndex].letter = '';
                }
            }
        },
        setColors: (state,action) => {
            const guessWord = action.payload;
            for (let i = 0; i < guessWord.length; i++) {
                if (state.word[i] === guessWord[i]) {
                    state.board[state.wordLine][i].color = 'green';
                } else if (state.word.includes(guessWord[i])) {
                    state.board[state.wordLine][i].color = 'yellow';
                } else {
                    state.board[state.wordLine][i].color = 'gray';
                }
            }
        },
        resetGame: (state) =>{
            state.isWin = false;
            state.isLose = false;
            state.wordLine = 0;
            state.word = getRandomWord();
            state.board = Array(initialState.attemps).fill().map(() => Array(initialState.wordLength).fill().map(() => ({ letter: "", color: "" })));
        }
    }
})

export const {
    setWord,
    setBoard,
    setIsWin,
    setIsLose,
    incrementWordLine,
    setCurrentGuess,
    setLetter,
    deleteLetter,
    setColors,
    checkWin,
    resetGame
} = wordleSlice.actions

export default wordleSlice.reducer