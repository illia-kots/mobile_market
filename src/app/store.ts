import {
  Action,
  ThunkAction,
  configureStore,
} from '@reduxjs/toolkit';

import favoriteAndCartReducer from '../features/favoriteAndCartSlice';
import productsReducer from '../features/productsSlice';
import selectedProductReducer from '../features/selectedProductSlice';
import themeReducer from '../features/themeSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    selectedProduct: selectedProductReducer,
    favoriteAndCartProducts: favoriteAndCartReducer,
    theme: themeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
