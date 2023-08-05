import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  isDarkMode: boolean;
};

const initialState: State = {
  isDarkMode: JSON.parse(localStorage.getItem('isDarkMode') || 'false'),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isDarkMode: action.payload,
    }),
  },
});

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;
