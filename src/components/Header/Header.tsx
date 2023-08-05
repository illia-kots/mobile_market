import classNames from 'classnames';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';

import productCategory from '../../api/productCategories.json';
import { useAppSelector } from '../../app/hooks';
import { Logo } from '../Logo';
import { MenuButton } from '../MenuButton';
import { NavBar } from '../NavBar';
import { Search } from '../Search';
import { ThemeToggler } from '../ThemeToggler';
import { TopActionsBar } from '../TopActionsBar';
import './Header.scss';

export const Header: React.FC = () => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  const { productId = '' } = useParams();
  const location = useLocation();

  const isFavoritePage = location.pathname.includes('favorites');
  const isCartPage = location.pathname.includes('cart');

  const productCategoryList = productCategory.map(item => item.type);
  const isSearchPanel = productCategoryList.find(
    item => location.pathname.includes(item) && !productId,
  );

  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpened(prevStatus => !prevStatus);
  }, []);

  useEffect(() => {
    setIsOpened(false);
  }, [location]);

  return (
    <header className={classNames(
      'page__header',
      'header',
      { 'header--dark': isDarkMode },
    )}
    >
      <div className={classNames(
        'header__container',
        { 'header__container--dark': isDarkMode },
      )}
      >
        {!isCartPage && (
          <div className="
            header__menu
            top-actions__menu"
          >
            <MenuButton
              isOpened={isOpened}
              onClick={handleOpen}
            />
          </div>
        )}

        <div
          className={classNames(
            'header__logo',
            { 'header__logo--cart': isCartPage },
          )}
        >
          <Logo />
        </div>

        {!isCartPage && (
          <nav className="header__nav">
            <NavBar type="header" />
          </nav>
        )}

        <div className="
          header__actions
          top-actions"
        >
          {isSearchPanel && (
            <Search
              isMenuOpened={isOpened}
              handleOpenMenu={handleOpen}
            />
          )}

          {isFavoritePage && (
            <Search
              isMenuOpened={isOpened}
              handleOpenMenu={handleOpen}
            />
          )}

          <div className={classNames(
            'header__toggler',
            { 'header__toggler--dark': isDarkMode },
          )}
          >
            <ThemeToggler />
          </div>

          {!isCartPage && (
            <TopActionsBar type="favorites" />
          )}

          <TopActionsBar type="cart" />
        </div>
      </div>

      {!isCartPage && (
        <div className="header__menu-list-container">
          <nav
            className={classNames(
              'header__menu-list',
              'menu',
              {
                'menu--opened': isOpened,
                'menu--opened-dark': isOpened && isDarkMode,
              },
            )}
          >
            <NavBar type="menu" />
          </nav>
        </div>
      )}
    </header>
  );
};
