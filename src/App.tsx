import classNames from 'classnames';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { loadProducts } from './features/productsSlice';

import './App.scss';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector(state => state.theme);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <div className={classNames(
      'App',
      'page',
      { 'App--dark': isDarkMode },
    )}
    >
      <Header />

      <main className="page__main">
        <div className="container">
          <div className="
            grid
            grid--desktop"
          >
            <Outlet />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
