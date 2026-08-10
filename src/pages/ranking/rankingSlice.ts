import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAB_DEFAULT_KEY } from '@/pages/ranking/constants';

const initialState = {
  activeTabKey: TAB_DEFAULT_KEY,
};

export const rankingSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {
    setTabKey: (state, action: PayloadAction<string>) => {
      state.activeTabKey = action.payload;
    },
  },
});

export const { setTabKey } = rankingSlice.actions;
export const rankingActions = rankingSlice.actions;
export const rankingReducer = rankingSlice.reducer;
export const createReducer = rankingSlice.reducer;

export default rankingSlice.reducer;
