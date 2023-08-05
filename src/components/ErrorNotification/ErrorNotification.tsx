import classNames from 'classnames';

import { useAppSelector } from '../../app/hooks';
import { ErrorType } from '../../types/Error';
import './ErrorNotification.scss';

type Props = {
  error: ErrorType,
};

export const ErrorNotification: React.FC<Props> = ({ error }) => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  return (
    <h1 className={classNames(
      'notification',
      'grid__item--tablet-1-12',
      'grid__item--desktop-1-24',
      { 'notification--dark': isDarkMode },
    )}
    >
      {`...${error}...`}
    </h1>
  );
};
