import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { PageNavLinkType } from '../../types/PageNavLink';
import './PageNavLink.scss';

type Props = {
  to: string,
  text: string,
  type: PageNavLinkType,
};

export const PageNavLink: React.FC<Props> = ({
  to,
  text,
  type,
}) => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navbar__item',
        {
          'navbar__item-dark': isDarkMode,
          'navbar__item--active': isActive,
          'navbar__item--active-dark': isActive && isDarkMode,
          'navbar__item-menu': type === 'menu',
        },
      )}
    >
      {text}
    </NavLink>
  );
};
