import { configureStore } from '@reduxjs/toolkit'
import wordle from './wordleSlice'
import stats from './statsSlice'

const someFunctionMiddleware = store => next => action => {
  const result = next(action);
  if (action.type.includes('wordle')) {
    localStorage.setItem('wordle', JSON.stringify(store.getState().wordle));
  }else if(action.type.includes('stats')){
    localStorage.setItem('stats',JSON.stringify(store.getState().stats));
  }

  return result;
};

export const store = configureStore({
  reducer: {wordle,stats},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(someFunctionMiddleware),
})