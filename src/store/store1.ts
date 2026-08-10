import { shelfReducer } from '@/pages/shelf/shelfSlice';
import { configureStore } from '@reduxjs/toolkit';
import { AppDispatch } from './store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { chapterReducer } from '@/pages/chapter/chapterSlice';
import { rankingReducer } from '@/pages/ranking/rankingSlice';

const store = configureStore({
  reducer: {
    ranking: rankingReducer,
    Shelf: shelfReducer,
    Chapter: chapterReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
