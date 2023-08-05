import classNames from 'classnames';
import {
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  Link,
  useLocation,
  useParams,
} from 'react-router-dom';

import { getProductDetails } from '../../api/products';
import { useAppSelector } from '../../app/hooks';
import { IconType } from '../../types/Icon';
import { capitalizeFirstLetter } from '../../utils/capitalizedText';
import { Icon } from '../Icon';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const { product } = useAppSelector(state => state.selectedProduct);
  const { isDarkMode } = useAppSelector(state => state.theme);

  const location = useLocation();
  const pageName = location.pathname.split('/').slice(1)[0];

  const { productId = '' } = useParams();

  const [isSelected, setIsSelected] = useState(false);

  const pageTitle = capitalizeFirstLetter(pageName);

  const productName = useMemo(() => {
    if (!product && productId) {
      getProductDetails(productId);
    }

    return product?.name;
  }, [product, productId]);

  useEffect(() => {
    if (productId) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, []);

  return (
    <div
      className={classNames(
        'page-status',
        'grid__item--tablet-1-12',
        'grid__item--desktop-1-24',
        { 'page-status--dark': isDarkMode },
      )}
      data-cy="breadCrumbs"
    >
      <Link
        to="/"
        className="page-status__home"
      >
        <Icon type={isDarkMode
          ? IconType.HOME_DARK
          : IconType.HOME}
        />
      </Link>

      <Icon type={isDarkMode
        ? IconType.ARROW_RIGHT_DISABLED_DARK
        : IconType.ARROW_RIGHT_DISABLED}
      />

      {isSelected ? (
        <>
          <Link
            to={`/${pageName}`}
            className={classNames(
              'page-status__link-title',
              { 'page-status__link-title--dark': isDarkMode },
            )}
          >
            {pageTitle}
          </Link>

          <Icon type={isDarkMode
            ? IconType.ARROW_RIGHT_DISABLED_DARK
            : IconType.ARROW_RIGHT_DISABLED}
          />

          <span className={classNames(
            'page-status__title',
            { 'page-status__title--dark': isDarkMode },
          )}
          >
            {productName}
          </span>
        </>
      ) : (
        <span className={classNames(
          'page-status__title',
          { 'page-status__title--dark': isDarkMode },
        )}
        >
          {pageTitle}
        </span>
      )}
    </div>
  );
};
