import classNames from 'classnames';
import { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { IconType } from '../../types/Icon';
import { SelectorType } from '../../types/SelectorType';
import { SortBy } from '../../types/SortedBy';
import { getSearchWith } from '../../utils/searchHelper';
import { Icon } from '../Icon';
import './DownDrops.scss';

type Props = {
  type: SelectorType,
};

export const DownDrops: React.FC<Props> = ({ type }) => {
  const { isDarkMode } = useAppSelector(state => state.theme);

  const [selectedValue, setSelectedValue] = useState('All');
  const [isOpened, setIsOpened] = useState(false);

  const location = useLocation();
  const categoryType = location.pathname.slice(1);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as SortBy || null;
  const perPage = searchParams.get('perPage') || null;

  const title = (type === SelectorType.SORT__BY)
    ? 'Sort by'
    : 'Items on page';

  const handleChangeValue = (value: string) => {
    setSelectedValue(value);
    setIsOpened(false);
  };

  const handleToggleList = () => {
    setIsOpened(!isOpened);
  };

  const sortByList: Record<string, string | null> = {
    Newest: 'year',
    Alphabetically: 'name',
    Cheapest: 'fullPrice',
    All: null,
  };

  const itemsOnPageList: Record<string, string | null> = {
    4: '4',
    8: '8',
    16: '16',
    All: null,
  };

  const defaultSelectorValue = () => {
    if (!sort || !perPage) {
      setSelectedValue('All');
    }

    if (type === SelectorType.SORT__BY && sort) {
      const sortItems = Object.entries(sortByList)
        .find(([, value]) => value === sort);

      if (sortItems) {
        setSelectedValue(sortItems[0]);
      }
    }

    if (type === SelectorType.ITEMS__ONPAGE && perPage) {
      const perPageItems = Object.entries(itemsOnPageList)
        .find(([, value]) => value === perPage);

      if (perPageItems) {
        setSelectedValue(perPageItems[0]);
      }
    }
  };

  const selectorParams = (type === SelectorType.SORT__BY)
    ? sortByList
    : itemsOnPageList;

  const getRouteParams = (
    selectorType: string,
    value: string,
  ) => {
    const sortByParams = {
      sort: selectorParams[value],
      perPage: searchParams.get('perPage'),
      page: searchParams.get('page'),
    };

    const itemsOnPageParams = {
      sort: searchParams.get('sort'),
      perPage: selectorParams[value],
      page: value === 'All' ? null : '1',
    };

    return (selectorType === SelectorType.SORT__BY)
      ? sortByParams
      : itemsOnPageParams;
  };

  const valuesList = Object.keys(selectorParams);

  useEffect(() => {
    defaultSelectorValue();
  }, [categoryType]);

  return (
    <div
      className={classNames(
        'selector__sortBy',
        'selector__items-onPage',
      )}
      onMouseLeave={() => setIsOpened(false)}
    >
      <div className={classNames(
        'selector__title',
        { 'selector__title--dark': isDarkMode },
      )}
      >
        {title}
      </div>

      <div className="selector__group">
        <div className="filter">
          <button
            className={classNames(
              'filter__button',
              { 'filter__button--dark': isDarkMode },
            )}
            type="button"
            onClick={handleToggleList}
          >
            <div className={classNames(
              'filter__selectedValue',
              { 'filter__selectedValue--dark': isDarkMode },
            )}
            >
              {selectedValue}
            </div>

            <div className="filter__arrow">
              {isOpened ? (
                <Icon type={isDarkMode
                  ? IconType.ARROW_UP_DISABLED_DARK
                  : IconType.ARROW_UP_DISABLED}
                />
              ) : (
                <Icon type={isDarkMode
                  ? IconType.ARROW_DOWN_DARK
                  : IconType.ARROW_DOWN}
                />
              )}
            </div>
          </button>

          {isOpened && (
            <ul className={classNames(
              'filter__container',
              { 'filter__container--dark': isDarkMode },
            )}
            >
              {valuesList.map(value => (
                <Link
                  to={{
                    search: getSearchWith(
                      searchParams,
                      getRouteParams(type, value),
                    ),
                  }}
                  key={value}
                  className={classNames(
                    'filter__value',
                    { 'filter__value--dark': isDarkMode },
                  )}
                  onClick={() => handleChangeValue(value)}
                >
                  {value}
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
