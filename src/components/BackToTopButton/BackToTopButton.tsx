import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { IconType } from '../../types/Icon';
import { scrollToTop } from '../../utils/scrollToTop';
import { Icon } from '../Icon';

import './BackToTopButton.scss';

export const BackToTopButton = () => {
  const location = useLocation();
  const { isDarkMode } = useAppSelector(state => state.theme);

  return (
    <Link
      to={location.pathname}
      className={classNames(
        'top-button',
        { 'top-button--dark': isDarkMode },
      )}
      onClick={scrollToTop}
    >
      <p className={classNames(
        'top-button__text',
        { 'top-button__text-dark': isDarkMode },
      )}
      >
        Back to top
      </p>

      <Icon
        type={isDarkMode
          ? IconType.ARROW_UP_DARK
          : IconType.ARROW_UP}
        addClassName="top-button__icon"
      />
    </Link>
  );
};
