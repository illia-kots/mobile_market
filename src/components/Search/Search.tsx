import classNames from 'classnames';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { SIZE_MOBILE } from '../../app/consts';
import { useAppSelector, useWindowSize } from '../../app/hooks';
import { IconType } from '../../types/Icon';
import { getSearchWith } from '../../utils/searchHelper';
import { Icon } from '../Icon';
import './Search.scss';

type Props = {
  isMenuOpened: boolean,
  handleOpenMenu: () => void,
};

export const Search: React.FC<Props> = ({ isMenuOpened, handleOpenMenu }) => {
  const { width } = useWindowSize();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const { isDarkMode } = useAppSelector(state => state.theme);

  const location = useLocation();
  const currLocation = location.pathname.slice(1);

  const [isMobileMode, setIsMobileMode] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const placeholderText = isMobileMode
    ? ''
    : `Search in ${currLocation}...`;

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setSearchParams(
      getSearchWith(
        searchParams, {
          query: event.target.value || null,
        },
      ),
    );
  };

  const handleDeleteQuery = () => {
    if (isMobileMode) {
      setIsOpened(true);
    }

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }

    setSearchParams(
      getSearchWith(
        searchParams, {
          query: '',
        },
      ),
    );
  };

  const handleSearchMobile = useCallback(() => {
    if (isMenuOpened) {
      handleOpenMenu();
    }

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }

    setIsOpened(prevStatus => !prevStatus);
  }, [isMenuOpened]);

  const handleClick = () => {
    setIsOpened(false);
  };

  const handleSearch = () => {
    if (searchInputRef.current) {
      setSearchParams(
        getSearchWith(
          searchParams, {
            query: searchInputRef.current.value || null,
          },
        ),
      );

      handleClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (width < SIZE_MOBILE) {
      setIsMobileMode(true);
    } else {
      setIsMobileMode(false);
    }
  }, [width]);

  useEffect(() => {
    if (isMenuOpened) {
      setIsOpened(false);
    }
  }, [isMenuOpened]);

  return (
    <>
      {isMobileMode && (
        <button
          className="search__icon"
          type="button"
          onClick={handleSearchMobile}
        >
          <Icon type={isDarkMode
            ? IconType.SEARCH_DARK
            : IconType.SEARCH}
          />
        </button>
      )}

      <div className={classNames(
        'search',
        {
          'search--dark': isDarkMode,
          search__mobile: isMobileMode,
          'search__mobile--active': isOpened,
        },
      )}
      >
        <input
          className="search__input"
          value={query}
          type="text"
          ref={searchInputRef}
          placeholder={placeholderText}
          onChange={handleChangeQuery}
          onKeyDown={handleKeyDown}
        />

        {query ? (
          <button
            className="search__button"
            data-cy="searchDelete"
            type="button"
            onClick={handleDeleteQuery}
          >
            <Icon type={IconType.CROSS} />
          </button>
        ) : (
          <span
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={handleClick}
          >
            <Icon type={isDarkMode
              ? IconType.SEARCH_DARK
              : IconType.SEARCH}
            />
          </span>
        )}
      </div>
    </>
  );
};
