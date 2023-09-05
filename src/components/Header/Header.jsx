import s from './Header.module.scss';
import statsIcon from '../../assets/statsIcon.svg';
import { useDispatch } from 'react-redux';
import { setStatsActive } from '../../redux/statsSlice';
const Header = () => {
    const dispatch = useDispatch();
    return (
        <header className={s.header}>
            <div className={s.title}>
                Wordle
            </div>
            <div className={s.stats} onClick={()=>{dispatch(setStatsActive(true))}}>
                <img src={statsIcon} alt="statsIcon" />
            </div>
        </header>
    );
}
 
export default Header;