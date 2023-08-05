import classNames from 'classnames';

import { useAppSelector } from '../../app/hooks';
import './SpecList.scss';

type Props = {
  specList: [string, string | string[]][];
};

export const SpecList: React.FC<Props> = ({ specList }) => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  return (
    <div className="tech-specs__full-spec">
      <ul className="full-spec__list">
        {specList.map(([name, value]) => (
          <li
            key={name}
            className="full-spec__item"
          >
            <div className="full-spec__item--name">
              {name}
            </div>

            <div className={classNames(
              'full-spec__item--value',
              { 'full-spec__item--value-dark': isDarkMode },
            )}
            >
              {Array.isArray(value)
                ? value.join(', ')
                : value}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
