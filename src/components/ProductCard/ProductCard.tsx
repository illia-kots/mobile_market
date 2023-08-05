import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getDetails } from '../../features/selectedProductSlice';
import { Product } from '../../types/Product';
import { scrollToTop } from '../../utils/scrollToTop';
import { CardButton } from '../CardButton';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name,
    category,
    itemId,
    image,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;
  const { isDarkMode } = useAppSelector(state => state.theme);

  const dispatch = useAppDispatch();

  const handleSelectProduct = () => {
    dispatch(getDetails(itemId));

    scrollToTop();
  };

  return (
    <div
      className={classNames(
        'product-card',
        { 'product-card--dark': isDarkMode },
      )}
      data-cy="cardsContainer"
    >
      <Link
        to={`../${category}/${itemId}`}
        className="product-card__link"
        onClick={handleSelectProduct}
      />

      <div className="product-card__image">
        <img
          className="product-card__picture"
          src={image}
          alt={name}
        />
      </div>

      <h3 className={classNames(
        'product-card__title',
        { 'product-card__title--dark': isDarkMode },
      )}
      >
        {name}
      </h3>

      <div className={classNames(
        'product-card__price',
        { 'product-card__price--dark': isDarkMode },
      )}
      >
        <span className={classNames(
          'product-card__discountPrice',
          { 'product-card__discountPrice--dark': isDarkMode },
        )}
        >
          {price
            ? `$${price}`
            : `$${fullPrice}`}
        </span>

        {price < fullPrice && (
          <span className="product-card__fullPrice">
            {`$${fullPrice}`}
          </span>
        )}
      </div>

      <div className="product-card__features">
        <span className="product-card__feature-item">
          Screen

          <div className={classNames(
            'product-card__feature-info',
            { 'product-card__feature-info--dark': isDarkMode },
          )}
          >
            {screen}
          </div>
        </span>

        <span className="product-card__feature-item">
          Capacity

          <div className={classNames(
            'product-card__feature-info',
            { 'product-card__feature-info--dark': isDarkMode },
          )}
          >
            {capacity}
          </div>
        </span>

        <span className="product-card__feature-item">
          RAM

          <div className={classNames(
            'product-card__feature-info',
            { 'product-card__feature-info--dark': isDarkMode },
          )}
          >
            {ram}
          </div>
        </span>
      </div>

      <div className="product-card__buttons">
        <div className="card-button">
          <CardButton
            typeButton="cart"
            size="small"
            product={product}
          />

          <CardButton
            typeButton="favorites"
            size="small"
            product={product}
          />
        </div>
      </div>
    </div>
  );
};
