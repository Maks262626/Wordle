import { useSelector } from 'react-redux';
import s from './Word.module.scss';
const Word = () => {
    const {word} = useSelector(state => state.wordle);
    return (
        <h1 className={s.word}>{word}</h1>
    );
}
 
export default Word;