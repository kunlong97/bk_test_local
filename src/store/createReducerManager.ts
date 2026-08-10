import { combineReducers, AnyAction, Reducer } from '@reduxjs/toolkit';
import { IReducers } from '@/store/configStore';

const createReducerManager = (initialReducers: IReducers) => {
  const reducers = { ...initialReducers };
  
  // 如果初始传入的 reducers 为空，提供一个占位 reducer
  // 这样 combineReducers 就不会因为空对象而报错了
  let rootReducers: Reducer = Object.keys(reducers).length > 0 
    ? combineReducers(reducers) 
    : (state = {} as any) => state;

  let keysToRemove: Array<string> = [];

  return {
    getReducers: () => reducers,
    reduce: (state: any, action: AnyAction) => {
      let newState = state;
      if (keysToRemove.length > 0) {
        newState = { ...state };
        for (let key of keysToRemove) {
          delete newState[key];
        }
        keysToRemove = [];
      }
      return rootReducers(newState, action);
    },
    addReducers: (newReducers: IReducers) => {
      let hasNewReducers = false;
      Object.keys(newReducers).forEach((key: string) => {
        if (key && !reducers[key]) {
          reducers[key] = newReducers[key];
          hasNewReducers = true;
        }
      });
      
      // 只有在确实新增了 reducer 时才重新 combineReducers
      if (hasNewReducers) {
        rootReducers = combineReducers(reducers);
      }
    },
    removeReducers: (keys: string[]) => {
      let hasRemovedReducers = false;
      keys.forEach((key) => {
        if (key && reducers[key]) {
          delete reducers[key];
          keysToRemove.push(key);
          hasRemovedReducers = true;
        }
      });
      
      // 只有在确实删除了 reducer 时才重新 combineReducers
      if (hasRemovedReducers) {
        rootReducers = Object.keys(reducers).length > 0 
          ? combineReducers(reducers) 
          : (state = {} as any) => state;
      }
    },
  };
};

export default createReducerManager;