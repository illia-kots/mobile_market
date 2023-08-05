import classNames from 'classnames';
import { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useParams,
} from 'react-router-dom';

import { SIZE_DESKTOP, SIZE_MOBILE } from '../../app/consts';
import { useAppSelector, useWindowSize } from '../../app/hooks';
import { Colors } from '../../types/Colors';
import { IconType } from '../../types/Icon';
import { ProductDetails } from '../../types/ProductDetails';
import { CardButton } from '../CardButton';
import { Icon } from '../Icon';
import { SpecList } from '../SpecList';
import './ProductDetailsInfo.scss';

export const ProductDetailsInfo = () => {
  const { productId = '' } = useParams();
  const { width } = useWindowSize();

  const { items } = useAppSelector(state => state.products);
  const { product } = useAppSelector(state => state.selectedProduct);
  const { isDarkMode } = useAppSelector(state => state.theme);

  const {
    id,
    images,
    color,
    capacity,
    colorsAvailable,
    capacityAvailable,
    description,
    name,
    namespaceId,
    priceDiscount,
    priceRegular,
  } = product as ProductDetails;

  const imagesList = images || [];
  const defaultImage = imagesList[0];
  const defaultSpec = {
    Screen: '',
    Resolution: '',
    Processor: '',
    RAM: '',
    'Built in memory': '',
    Camera: '',
    Zoom: '',
    Cell: [''],
  };

  const [productSpec, setProductSpec] = useState(defaultSpec);
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedCapacity, setSelectedCapacity] = useState(capacity);
  const [currPosition, setCurrPosition] = useState(0);
  const [imagesInSlider, setImagesInSlider] = useState(2);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const location = useLocation();
  const currentCategory = location.pathname.split('/').slice(1)[0];

  const productItemId = items.find(item => item.phoneId === id)?.id || '';
  const productItem = items.find(item => item.phoneId === id) || null;

  const specShortList = Object.entries(productSpec).slice(0, 4);
  const specFullList = Object.entries(productSpec);

  const sliderOptions = {
    imageHeight: 96,
    imagesOnPage: imagesInSlider,
    animationDuration: 500,
  };

  const {
    imageHeight,
    imagesOnPage,
    animationDuration,
  } = sliderOptions;

  const isMoveNextDisabled = (
    currPosition >= imagesList.length - imagesOnPage
  );

  const isMovePrevDisabled = currPosition <= 0;

  const moveLimit = -(
    (imagesList.length * imageHeight) - (imageHeight * imagesOnPage)
  );

  const transformation = (currPosition * imageHeight) >= moveLimit
    ? currPosition * imageHeight
    : moveLimit;

  const sliderHeight = () => {
    let imagesToShow = 2;

    if (width > SIZE_DESKTOP) {
      imagesToShow = Math.min(imagesList.length, 4);
    } else if (width > SIZE_MOBILE && width < SIZE_DESKTOP) {
      imagesToShow = Math.min(imagesList.length, 3);
    }

    setImagesInSlider(imagesToShow);
  };

  const handlePrevButton = () => {
    if (!isMovePrevDisabled) {
      setCurrPosition(currPosition - 1);
    }
  };

  const handleNextButton = () => {
    if (!isMoveNextDisabled) {
      setCurrPosition(currPosition + 1);
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const touchDown = event.touches[0].clientY || null;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = event.touches[0].clientY;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      handleNextButton();
    }

    if (diff < -5) {
      handlePrevButton();
    }

    setTouchPosition(null);
  };

  const productInfo = () => {
    if (product) {
      setProductSpec({
        Screen: product.screen,
        Resolution: product.resolution,
        Processor: product.processor,
        RAM: `${product.ram.slice(0, -2)} GB`,
        'Built in memory': `${product.capacity.slice(0, -2)} GB`,
        Camera: product.camera,
        Zoom: product.zoom,
        Cell: product.cell,
      });
    }
  };

  const productColorLink = `/${currentCategory}/${namespaceId}-${capacity
    .toLocaleLowerCase()}`;

  const productCapacityLink = (data: string) => {
    return `/${currentCategory}/${namespaceId}-${data.toLocaleLowerCase()}-${color}`;
  };

  useEffect(() => {
    productInfo();
  }, [productId]);

  useEffect(() => {
    sliderHeight();
  }, [width]);

  useEffect(() => {
    setCurrPosition(0);
  }, []);

  return (
    <section className="
      page__section
      product-details
      grid__item--tablet-1-12
      grid__item--desktop-1-24"
    >
      <h1 className={classNames(
        'page__section-title',
        'product-details__title',
        { 'page__section-title--dark': isDarkMode },
      )}
      >
        {name}
      </h1>

      <div className="
        product-details__main-details
        main-details"
      >
        <div className="
          grid
          grid--desktop"
        >
          <div className="
            main-details__product-id
            grid__item--tablet-11-12
            grid__item--desktop-23-24"
          >
            {`ID: ${productItemId}`}
          </div>

          <div className="
            main-details__product-images
            product-images
            grid__item--tablet-1-6
            grid__item--desktop-1-12"
          >
            <div className="
              product-images__slider
              images-slider"
            >
              <button
                className={classNames(
                  'images-slider__button',
                  'images-slider__button--prev',
                  { 'images-slider__button--dark': isDarkMode },
                )}
                type="button"
                aria-label="PREV"
                disabled={isMovePrevDisabled}
                onClick={handlePrevButton}
              >
                {isDarkMode ? (
                  <Icon
                    type={isMovePrevDisabled
                      ? IconType.ARROW_UP_DISABLED_DARK
                      : IconType.ARROW_UP_DARK}
                    addClassName="images-slider__button--icon"
                  />
                ) : (
                  <Icon
                    type={isMovePrevDisabled
                      ? IconType.ARROW_UP_DISABLED
                      : IconType.ARROW_UP}
                    addClassName="images-slider__button--icon"
                  />
                )}
              </button>

              <div
                className="small-images"
                style={{
                  height: `${imageHeight * imagesOnPage}px`,
                  touchAction: 'none',
                }}
                onTouchStart={event => handleTouchStart(event)}
                onTouchMove={event => handleTouchMove(event)}
              >
                <div
                  className="
                    product-images__small-images
                    images-slider__images
                    small-images__container"
                  style={{
                    transform: `translateY(-${transformation}px)`,
                    transitionDuration: `${animationDuration}ms`,
                  }}
                >
                  {imagesList.map((imageItem) => (
                    <div
                      key={imageItem}
                      role="button"
                      className={classNames(
                        'small-images__image',
                        {
                          'small-images__image--dark': isDarkMode,
                          'small-images__image--active':
                            selectedImage === imageItem,
                          'small-images__image--dark-active':
                            selectedImage === imageItem && isDarkMode,
                        },
                      )}
                      tabIndex={0}
                      onClick={() => setSelectedImage(imageItem)}
                      onKeyDown={() => setSelectedImage(imageItem)}
                    >
                      <img
                        src={imageItem}
                        alt="smallImage"
                        className="additional-image"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={classNames(
                  'images-slider__button',
                  'images-slider__button--next',
                  { 'images-slider__button--dark': isDarkMode },
                )}
                type="button"
                aria-label="NEXT"
                disabled={isMoveNextDisabled}
                onClick={handleNextButton}
              >
                {isDarkMode ? (
                  <Icon
                    type={isMoveNextDisabled
                      ? IconType.ARROW_DOWN_DISABLED_DARK
                      : IconType.ARROW_DOWN_DARK}
                    addClassName="images-slider__button--icon"
                  />
                ) : (
                  <Icon
                    type={isMoveNextDisabled
                      ? IconType.ARROW_DOWN_DISABLED
                      : IconType.ARROW_DOWN}
                    addClassName="images-slider__button--icon"
                  />
                )}
              </button>
            </div>

            <div className="product-images__main-image">
              <img
                src={selectedImage}
                alt="mainImage"
                className="main-image"
              />
            </div>
          </div>

          <div className="
            main-info__specifications
            specifications
            grid__item--tablet-7-10
            grid__item--desktop-14-20"
          >
            <div className="
              specifications__colors
              colors
              grid__item--tablet-7-11
              grid__item--desktop-14-22"
            >
              <h3 className={classNames(
                'specifications__name',
                { 'specifications__name--dark': isDarkMode },
              )}
              >
                Available colors
              </h3>

              <ul className={classNames(
                'colors__list',
                { 'colors__list--dark': isDarkMode },
              )}
              >
                {colorsAvailable?.map(colorItem => (
                  <li
                    key={colorItem}
                    className={classNames(
                      'colors__item-circle',
                      {
                        'colors__item-circle--dark': isDarkMode,
                        'colors__item-circle--active':
                          selectedColor === colorItem,
                        'colors__item-circle--dark-active':
                          selectedColor === colorItem && isDarkMode,
                      },
                    )}
                  >
                    <Link
                      to={`${productColorLink}-${colorItem}`}
                      style={{ backgroundColor: Colors[colorItem] }}
                      className={classNames(
                        'colors__item',
                        { 'colors__item--dark': isDarkMode },
                      )}
                      onClick={() => setSelectedColor(colorItem)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="
              specifications__capacity
              capacity"
            >
              <h3 className={classNames(
                'specifications__name',
                { 'specifications__name--dark': isDarkMode },
              )}
              >
                Select capacity
              </h3>

              <ul className={classNames(
                'capacity__list',
                { 'capacity__list--dark': isDarkMode },
              )}
              >
                {capacityAvailable?.map(capacityItem => (
                  <li
                    key={capacityItem}
                    className={classNames(
                      'capacity__item',
                      {
                        'capacity__item--dark': isDarkMode,
                        'capacity__item--active':
                          selectedCapacity === capacityItem,
                        'capacity__item--dark-active':
                          selectedCapacity === capacityItem && isDarkMode,
                      },
                    )}
                  >
                    <Link
                      to={productCapacityLink(capacityItem)}
                      className={classNames(
                        'capacity__link',
                        {
                          'capacity__link--dark': isDarkMode,
                          'capacity__link--active':
                            selectedCapacity === capacityItem,
                          'capacity__link--dark-active':
                            selectedCapacity === capacityItem && isDarkMode,
                        },
                      )}
                      onClick={() => setSelectedCapacity(capacityItem)}
                    >
                      {`${capacityItem.slice(0, -2)} GB`}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="
              specifications__price
              price"
            >
              <span className={classNames(
                'price__discountPrice',
                { 'price__discountPrice--dark': isDarkMode },
              )}
              >
                {priceDiscount
                  ? `$${priceDiscount}`
                  : `$${priceRegular}`}
              </span>

              {priceDiscount < priceRegular && (
                <span className="price__priceRegular">
                  {`$${priceRegular}`}
                </span>
              )}
            </div>

            <div className="
              specifications__buttons
              card-button"
            >
              <CardButton
                typeButton="cart"
                size="big"
                product={productItem}
              />

              <CardButton
                typeButton="favorites"
                size="big"
                product={productItem}
              />
            </div>

            <div className="specifications__short-spec">
              <ul className="short-spec__list">
                {specShortList.map(item => (
                  <li
                    key={item[0]}
                    className="short-spec__item"
                  >
                    <div className={classNames(
                      'short-spec__item--name',
                      { 'short-spec__item--name-dark': isDarkMode },
                    )}
                    >
                      {item[0]}
                    </div>

                    <div className={classNames(
                      'short-spec__item--value',
                      { 'short-spec__item--value-dark': isDarkMode },
                    )}
                    >
                      {item[1]}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="
        product-details__additional-details
        additional-details"
      >
        <div className="
          grid
          grid--desktop"
        >
          <div className="
            additional-details__about
            about
            grid__item--tablet-1-6
            grid__item--desktop-1-12"
          >
            <h2 className={classNames(
              'additional-details__title',
              { 'additional-details__title--dark': isDarkMode },
            )}
            >
              About
            </h2>

            <div
              className="about__list"
              data-cy="productDescription"
            >
              {description.map(({ text, title }) => (
                <div className="about__text">
                  <h3 className={classNames(
                    'about__text-name',
                    { 'about__text-name--dark': isDarkMode },
                  )}
                  >
                    {title}
                  </h3>
                  <div className="about__text-description">
                    {text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="
            additional-details__tech-specs
            tech-specs
            grid__item--tablet-8-12
            grid__item--desktop-14-24"
          >
            <h2 className={classNames(
              'additional-details__title',
              { 'additional-details__title--dark': isDarkMode },
            )}
            >
              Tech specs
            </h2>

            <SpecList specList={specFullList} />
          </div>
        </div>
      </div>
    </section>
  );
};
