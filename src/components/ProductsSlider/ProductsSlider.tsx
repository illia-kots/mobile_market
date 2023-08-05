import classNames from 'classnames';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';

import productCategoryList from '../../api/productCategories.json';
import {
  SIZE_DESKTOP,
  SIZE_TABLET,
  SIZE_MOBILE,
} from '../../app/consts';
import { useAppSelector, useWindowSize } from '../../app/hooks';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getSuggestedProducts,
} from '../../helpers/getProductsBy';
import { IconType } from '../../types/Icon';
import { Slider } from '../../types/Slider';
import { ErrorNotification } from '../ErrorNotification';
import { Icon } from '../Icon';
import { ProductCard } from '../ProductCard';

import './ProductsSlider.scss';

type Props = {
  type: Slider,
};

export const ProductsSlider: React.FC<Props> = ({ type }) => {
  const { productId = '' } = useParams();
  const { width } = useWindowSize();

  const { items, isError } = useAppSelector(state => state.products);
  const { isDarkMode } = useAppSelector(state => state.theme);

  const location = useLocation();
  const currentCategory = location.pathname.split('/').slice(1)[0];

  const [currPosition, setCurrPosition] = useState(0);
  const [itemsInSlider, setItemsInSlider] = useState(4);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const productCategory = useMemo(() => {
    if (!currentCategory.length) {
      return 'home';
    }

    const category = productCategoryList.find(
      item => item.type === currentCategory,
    );

    return category
      ? category.type
      : 'phone';
  }, [location]);

  const sliderTitle = useMemo(() => {
    switch (type) {
      case Slider.HOTPRICES:
        return 'Hot prices';

      case Slider.BRANDNEW:
        return 'Brand new';

      case Slider.SUGGESTIONS:
        return 'You may also like';

      default:
        return '';
    }
  }, [type]);

  const sliderProductList = useMemo(() => {
    switch (type) {
      case Slider.HOTPRICES:
        return getHotPriceProducts(items);

      case Slider.BRANDNEW:
        return getBrandNewProducts(items);

      default:
      case Slider.SUGGESTIONS:
        return getSuggestedProducts(items, productCategory, productId);
    }
  }, [type, productId, items]);

  const cardSize = (width > SIZE_TABLET) ? 288 : 296;

  const sliderOptions = {
    cardWidth: cardSize,
    cardsOnPage: itemsInSlider,
    animationDuration: 500,
  };

  const {
    cardWidth,
    cardsOnPage,
    animationDuration,
  } = sliderOptions;

  const moveLimit = -(
    (sliderProductList.length * cardWidth) - (cardWidth * cardsOnPage)
  );

  const transformation = (currPosition * cardWidth) >= moveLimit
    ? currPosition * cardWidth
    : moveLimit;

  const disabledMoveNext = (
    (currPosition + cardsOnPage) >= sliderProductList.length
  );
  const disabledMovePrev = currPosition <= 0;

  const handleMoveNext = () => {
    if (currPosition === sliderProductList.length - cardsOnPage) {
      setCurrPosition(0);
    } else {
      setCurrPosition(
        Math.min(currPosition + 1, sliderProductList.length - cardsOnPage),
      );
    }
  };

  const handleMovePrev = () => {
    if (currPosition === 0) {
      setCurrPosition(sliderProductList.length - cardsOnPage);
    } else {
      setCurrPosition(Math.max(currPosition - 1, 0));
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const touchDown = event.touches[0].clientX || null;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = event.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      handleMoveNext();
    }

    if (diff < -5 && !disabledMovePrev) {
      handleMovePrev();
    }

    setTouchPosition(null);
  };

  const getSliderWidth = () => {
    if (width > SIZE_DESKTOP) {
      if (sliderProductList.length < 4) {
        setItemsInSlider(sliderProductList.length);
      } else {
        setItemsInSlider(4);
      }
    }

    if (width > SIZE_TABLET && width < SIZE_DESKTOP) {
      if (sliderProductList.length < 3) {
        setItemsInSlider(sliderProductList.length);
      } else {
        setItemsInSlider(3);
      }
    }

    if (width > SIZE_MOBILE && width < SIZE_TABLET) {
      if (sliderProductList.length < 2) {
        setItemsInSlider(sliderProductList.length);
      } else {
        setItemsInSlider(2);
      }
    }

    if (width < SIZE_MOBILE) {
      setItemsInSlider(1);
    }
  };

  useEffect(() => {
    getSliderWidth();
  }, [width, sliderProductList]);

  return (
    <section className="
      page__section
      products-slider
      grid__item--tablet-1-12
      grid__item--desktop-1-24"
    >
      <div className="products-slider__header">
        <h1 className={classNames(
          'page__section-title',
          'products-slider__title',
          { 'page__section-title--dark': isDarkMode },
        )}
        >
          {sliderTitle}
        </h1>

        <div className="
          products-slider__buttons-container
          grid__item--tablet-10-12
          grid__item--desktop-21-24"
        >
          <button
            className={classNames(
              'products-slider__button',
              'grid__item--tablet-10-11',
              'grid__item--desktop-21-22',
              { 'products-slider__button--dark': isDarkMode },
            )}
            type="button"
            aria-label="Prev"
            onClick={handleMovePrev}
            disabled={disabledMovePrev}
          >
            {isDarkMode ? (
              <Icon type={disabledMovePrev
                ? IconType.ARROW_LEFT_DISABLED_DARK
                : IconType.ARROW_LEFT_DARK}
              />
            ) : (
              <Icon type={disabledMovePrev
                ? IconType.ARROW_LEFT_DISABLED
                : IconType.ARROW_LEFT}
              />
            )}
          </button>

          <button
            className={classNames(
              'products-slider__button',
              'grid__item--tablet-11-12',
              'grid__item--desktop-23-24',
              { 'products-slider__button--dark': isDarkMode },
            )}
            type="button"
            aria-label="Next"
            onClick={handleMoveNext}
            disabled={disabledMoveNext}
          >
            {isDarkMode ? (
              <Icon type={disabledMoveNext
                ? IconType.ARROW_RIGHT_DISABLED_DARK
                : IconType.ARROW_RIGHT_DARK}
              />
            ) : (
              <Icon type={disabledMoveNext
                ? IconType.ARROW_RIGHT_DISABLED
                : IconType.ARROW_RIGHT}
              />
            )}
          </button>
        </div>
      </div>

      {isError ? (
        <ErrorNotification error={isError} />
      ) : (
        <div
          className="
            products-slider__content
            grid__item--tablet-1-12
            grid__item--desktop-1-24"
          style={{
            maxWidth: `${cardsOnPage * cardWidth}px`,
          }}
          onTouchStart={event => handleTouchStart(event)}
          onTouchMove={event => handleTouchMove(event)}
        >
          <div
            className="products-slider__items"
            style={{
              transform: `translateX(-${transformation}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            {sliderProductList.map(item => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
