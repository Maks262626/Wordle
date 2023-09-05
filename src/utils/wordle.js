import { words } from "./data";

export const getRandomWord = () => {
    return words[Math.floor(Math.random()*words.length)];
}
export const checkWordInDict = (word) => {
    return Boolean(words.find(w => w === word));
}
