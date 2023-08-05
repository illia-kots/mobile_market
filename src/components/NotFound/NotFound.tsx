import classNames from 'classnames';

import { useAppSelector } from '../../app/hooks';
import { ErrorType } from '../../types/Error';
import './NotFound.scss';

type Props = {
  error: ErrorType,
};

export const NotFound: React.FC<Props> = ({ error }) => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  return (
    <div className="
      not-found
      grid__item--tablet-1-12
      grid__item--desktop-1-24"
    >
      <span className="not-found__image" />

      <h1 className={classNames(
        'not-found__text',
        { 'not-found__text--dark': isDarkMode },
      )}
      >
        {error}
      </h1>
    </div>
  );
};
