import { Link } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { scrollToTop } from '../../utils/scrollToTop';
import './Logo.scss';

export const Logo: React.FC = () => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  return (
    <Link
      to="/"
      onClick={scrollToTop}
    >
      {isDarkMode ? (
        <img
          src="./img/icons/logo-MM-dark.svg"
          alt="logo"
          className="logo"
        />
      ) : (
        <img
          src="./img/icons/logo-MM.svg"
          alt="logo"
          className="logo"
        />
      )}
    </Link>
  );
};
