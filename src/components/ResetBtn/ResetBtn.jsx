import { useDispatch } from "react-redux";
import s from './ResetBtn.module.scss';
import { setStatsActive } from "../../redux/statsSlice";
import { resetGame } from "../../redux/wordleSlice";
const ResetBtn = () => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setStatsActive(false));
        dispatch(resetGame());
    }
    return (
        <button className={s.btn} onClick={()=>{handleClick()}}>Reset</button>
    )
}
 
export default ResetBtn;