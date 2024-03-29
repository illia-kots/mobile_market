import classNames from 'classnames';
import { useEffect, useState } from 'react';

import bannerImages from '../../api/banners.json';
import { useAppSelector } from '../../app/hooks';
import { IconType } from '../../types/Icon';
import { Icon } from '../Icon';
import './BannerSlider.scss';

export const BannerSlider = () => {
  const [currPosition, setCurrPosition] = useState(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const { isDarkMode } = useAppSelector(state => state.theme);

  const handleMoveNext = () => {
    setCurrPosition((prevImage) => (
      prevImage === bannerImages.length - 1
        ? 0
        : prevImage + 1
    ));
  };

  const handleMovePrev = () => {
    setCurrPosition((prevImage) => (
      prevImage === 0
        ? bannerImages.length - 1
        : prevImage - 1
    ));
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

    if (diff < -5) {
      handleMovePrev();
    }

    setTouchPosition(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleMoveNext();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currPosition]);

  return (
    <section className="
      page__section
      banner
      grid__item--tablet-1-12
      grid__item--desktop-1-24"
    >
      <div className="banner__container">
        <button
          type="button"
          className={classNames(
            'banner__button',
            'grid__item--tablet-1-1',
            'grid__item--desktop-1-1',
            { 'banner__button--dark': isDarkMode },
          )}
          onClick={handleMovePrev}
          disabled={currPosition >= bannerImages.length}
        >
          <Icon type={isDarkMode
            ? IconType.ARROW_LEFT_DARK
            : IconType.ARROW_LEFT}
          />
        </button>

        <div
          className="
            banner__content
            grid__item--tablet-2-11
            grid__item--desktop-2-10"
          onTouchStart={event => handleTouchStart(event)}
          onTouchMove={event => handleTouchMove(event)}
        >
          {bannerImages.map((item, index) => (
            <img
              key={`banner-image-${item.title}`}
              alt={`Banner-${item.title}`}
              className={classNames(
                'banner__image',
                { 'banner__image--active': currPosition === index },
              )}
              src={item.image}
            />
          ))}
        </div>

        <button
          type="button"
          className={classNames(
            'banner__button',
            'grid__item--tablet-12-12',
            'grid__item--desktop-24-24',
            { 'banner__button--dark': isDarkMode },
          )}
          onClick={handleMoveNext}
        >
          <Icon type={isDarkMode
            ? IconType.ARROW_RIGHT_DARK
            : IconType.ARROW_RIGHT}
          />
        </button>
      </div>

      <div className="banner__move">
        {bannerImages.map((item, index) => (
          <button
            key={`banner-button-${item.title}`}
            type="button"
            aria-label="PickImage"
            className={classNames(
              'banner__move__item',
              {
                'banner__move__item--dark': isDarkMode,
                'banner__move__item--active': currPosition === index,
                'banner__move__item--active-dark':
                  currPosition === index && isDarkMode,
              },
            )}
            onClick={() => setCurrPosition(index)}
          />
        ))}
      </div>
    </section>
  );
};
