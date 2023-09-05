import s from './Cell.module.scss';

const Cell = ({ color, letter,index }) => {
    const colorClasses = {
        green: s.green,
        yellow: s.yellow,
        gray: s.gray
    };

    const cellColor = colorClasses[color] || '';
    const animationClass = `animation${index}`;
    return (
        <div className={`${s.cell} ${cellColor} ${s[animationClass]}`}>
            {letter}
        </div>
    );
}

export default Cell;
