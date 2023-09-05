import { useSelector } from 'react-redux';
import s from './Board.module.scss';
import Cell from '../Cell/Cell';
const Board = () => {
    const { board } = useSelector(state => state.wordle);
    return (
        <div className={s.board}>
            {board.map((_, lineIndex) => {
                return <div className={`${s.wordLine}`} key={lineIndex}>
                    {board[lineIndex].map((cell, index) => {
                        return <Cell key={index} letter={cell.letter} color={cell.color} index={index} />;
                    })}
                </div>
            })}
        </div>
    );
}

export default Board;