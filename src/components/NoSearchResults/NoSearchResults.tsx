import classNames from 'classnames';

import { useAppSelector } from '../../app/hooks';
import './NoSearchResults.scss';

type Props = {
  title: string,
};

export const NoSearchResults: React.FC<Props> = ({ title }) => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  return (
    <div className="noResults">
      <h1 className={classNames(
        'noResults__title',
        { 'noResults__title--dark': isDarkMode },
      )}
      >
        {`${title} not found...`}
      </h1>
    </div>
  );
};
