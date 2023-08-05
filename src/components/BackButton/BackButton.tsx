import classNames from 'classnames';

import { useAppSelector } from '../../app/hooks';
import { IconType } from '../../types/Icon';
import { Icon } from '../Icon';
import './BackButton.scss';

export const BackButton = () => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  return (
    <button
      className={classNames(
        'back-button',
        'grid__item--desktop-1-24',
        { 'back-button--dark': isDarkMode },
      )}
      type="button"
      data-cy="backButton"
      onClick={() => window.history.back()}
    >
      <Icon
        type={isDarkMode
          ? IconType.ARROW_LEFT_DARK
          : IconType.ARROW_LEFT}
        addClassName="back-button__arrow"
      />

      Back
    </button>
  );
};
