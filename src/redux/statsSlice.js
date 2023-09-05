import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    wins: 0,
    loses: 0,
    currentStreak: 0,
    maxStreak: 0,
    statsActive: false,
    isGameInitialized: false
}

const savedStats = localStorage.getItem('stats');
const savedStatsState = savedStats ? JSON.parse(savedStats) : initialState;
export const statsSlice = createSlice({
    name: 'stats',
    initialState:savedStatsState,
    reducers: {
        incrementWins: (state) => {
            state.wins++;
            state.currentStreak++;
            if(state.currentStreak > state.maxStreak){
                state.maxStreak = state.currentStreak;
            }
        },
        incrementLoses: (state) => {
            state.loses++;
            state.currentStreak = 0;
        },
        setStatsActive: (state,action) => {
            state.statsActive = action.payload;
        },
        setIsGameInitialized: (state) => {
            state.isGameInitialized = true;
        },
    },

})

export const {
    incrementWins,
    incrementLoses,
    setStatsActive,
    setIsGameInitialized
} = statsSlice.actions

export const selectTotalGames = (state) => state.stats.wins + state.stats.loses;
export const selectWinsPercent = (state) => {
    const totalGames = state.stats.wins + state.stats.loses;
    if(totalGames === 0) return 0;
    return Math.floor((100*state.stats.wins)/(totalGames))
};
export default statsSlice.reducer