import classNames from 'classnames';

import { useAppSelector } from '../../app/hooks';

type Props = {
  isOpened: boolean,
  onClick: () => void,
};

export const MenuButton: React.FC<Props> = ({ isOpened, onClick }) => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  return (
    <button
      className={classNames(
        'top-actions__link',
        'top-actions__link--button',
        { 'top-actions__link--button-dark': isDarkMode },
      )}
      type="button"
      onClick={onClick}
    >
      <span
        className={classNames(
          'icon',
          {
            icon__menu: !isOpened,
            'icon__menu--dark': !isOpened && isDarkMode,
            icon__cross: isOpened,
            'icon__cross--disabled': isOpened && isDarkMode,
          },
        )}
      />
    </button>
  );
};
