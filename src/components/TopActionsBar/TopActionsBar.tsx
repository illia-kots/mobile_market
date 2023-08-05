import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { IconType } from '../../types/Icon';
import { TopActionsNav } from '../../types/PageType';
import { Icon } from '../Icon';
import './TopActionsBar.scss';

type Props = {
  type: TopActionsNav,
};

export const TopActionsBar: React.FC<Props> = ({ type }) => {
  const {
    favorites,
    cart,
  } = useAppSelector(state => state.favoriteAndCartProducts);
  const { isDarkMode } = useAppSelector(state => state.theme);

  const isFavorites = type === 'favorites';
  const isCart = type === 'cart';

  const counter = isFavorites ? favorites : cart;

  return (
    <div className={classNames(
      'top-actions__item',
      {
        'top-actions__item--dark': isDarkMode,
        'top-actions__item--favorite': isFavorites,
        'top-actions__item--cart': isCart,
      },
    )}
    >
      <NavLink
        to={type}
        className={({ isActive }) => classNames(
          'top-actions__link',
          {
            'top-actions__link--active': isActive,
            'top-actions__link--active-dark': isActive && isDarkMode,
          },
        )}
      >
        {isDarkMode ? (
          <Icon type={isFavorites
            ? IconType.FAVORITE_DARK
            : IconType.CART_DARK}
          />
        ) : (
          <Icon type={isFavorites
            ? IconType.FAVORITE
            : IconType.CART}
          />
        )}

        {!!counter.length && (
          <span className={classNames(
            'top-actions__item-count',
            { 'top-actions__item-count--dark': isDarkMode },
          )}
          >
            {counter.length}
          </span>
        )}
      </NavLink>
    </div>
  );
};
