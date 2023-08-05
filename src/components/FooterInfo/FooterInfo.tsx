import classNames from 'classnames';
import { Link } from 'react-router-dom';

import footerNavList from '../../api/footerNav.json';
import { useAppSelector } from '../../app/hooks';

import './FooterInfo.scss';

export const FooterInfo = () => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  return (
    <div className="footer__info">
      {footerNavList.map(navItem => (
        <Link
          key={navItem.title}
          to={navItem.link}
          target="_blank"
          className={classNames(
            'footer__link',
            { 'footer__link--dark': isDarkMode },
          )}
        >
          <p>{navItem.title}</p>
        </Link>
      ))}
    </div>
  );
};
