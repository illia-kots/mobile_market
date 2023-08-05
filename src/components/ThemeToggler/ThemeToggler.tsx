import classNames from 'classnames';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import {
  useAppDispatch,
  useAppSelector,
  useLocalStorage,
} from '../../app/hooks';
import { setTheme } from '../../features/themeSlice';
import './ThemeToggler.scss';

export const ThemeToggler: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector(state => state.theme);

  const [setStorageTheme] = useLocalStorage<boolean>(
    'isDarkMode', isDarkMode,
  );

  const handleChange = () => {
    dispatch(setTheme(!isDarkMode));
    setStorageTheme(!isDarkMode);
  };

  return (
    <div className={classNames(
      'theme-toggler',
      { 'theme-toggler--dark': isDarkMode },
    )}
    >
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={handleChange}
        size={24}
      />
    </div>
  );
};
