import { words } from "./data";

export const getRandomWord = () => {
    return words[Math.floor(Math.random()*words.length)];
}
export const checkWordInDict = (word) => {
    return Boolean(words.find(w => w === word));
}
export const getGuessedWord = (board,wordLine) =>{
    return board[wordLine]?.map(cell=>cell.letter).join("").toLowerCase();
}
export const checkWin = (word,guessWord) =>{
    return word === guessWord;
}
export const checkLose = (wordLine,attemps) => {
    return wordLine === attemps-1;
}