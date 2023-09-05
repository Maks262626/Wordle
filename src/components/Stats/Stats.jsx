import { useDispatch, useSelector } from 'react-redux';
import s from './Stats.module.scss';
import ResetBtn from '../ResetBtn/ResetBtn';
import { selectTotalGames, selectWinsPercent, setStatsActive } from '../../redux/statsSlice';
import closeIcon from '../../assets/closeIcon.svg';
const Stats = () => {
    const dispatch = useDispatch();
    const {currentStreak,maxStreak,statsActive} = useSelector(state => state.stats);
    const {isWin,isLose} = useSelector(state => state.wordle);
    const totalGames = useSelector(selectTotalGames);
    const winsPercent = useSelector(selectWinsPercent);

    return (
        <div className={`${s.stats} ${statsActive && s.active}`}>
            <div className={s.info}>
                <div className={s.col}>
                    <h1>{totalGames}</h1>
                    <span>Games</span>
                </div>
                <div className={s.col}>
                    <h1>{winsPercent}</h1>
                    <span>Win%</span>
                </div>
                <div className={s.col}>
                    <h1>{currentStreak}</h1>
                    <span>Current Streak</span>
                </div>
                <div className={s.col}>
                    <h1>{maxStreak}</h1>
                    <span>Max Streak</span>
                </div>
            </div>
            <div className={s.close} onClick={()=>{dispatch(setStatsActive(false))}}>
                <img src={closeIcon} alt="closeIcon" />
            </div>
            {(isWin || isLose) && <ResetBtn/>}
        </div>
    );
}
 
export default Stats;