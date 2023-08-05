import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { BackToTopButton } from '../BackToTopButton';
import { FooterInfo } from '../FooterInfo';
import { Logo } from '../Logo';

import './Footer.scss';

export const Footer = () => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  const location = useLocation();
  const isCartPage = location.pathname.includes('cart');

  return (
    <footer className={classNames(
      'page__footer',
      'footer',
      { 'footer--dark': isDarkMode },
    )}
    >
      <div className="footer__container">
        <Logo />

        <FooterInfo />

        {!isCartPage && <BackToTopButton />}
      </div>
    </footer>
  );
};
