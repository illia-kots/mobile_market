import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ErrorNotification } from '../../components/ErrorNotification';
import { Loader } from '../../components/Loader';
import { ProductDetailsInfo } from '../../components/ProductDetailsInfo';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getDetails } from '../../features/selectedProductSlice';
import { Slider } from '../../types/Slider';

export const ProductDetailsPage = () => {
  const dispatch = useAppDispatch();

  const { loaded, isError } = useAppSelector(state => state.selectedProduct);

  const { productId = '' } = useParams();

  useEffect(() => {
    dispatch(getDetails(productId));
  }, [productId]);

  return (
    <>
      {loaded ? (
        <>
          <Breadcrumbs />

          <BackButton />

          {isError ? (
            <ErrorNotification error={isError} />
          ) : (
            <>
              <ProductDetailsInfo />

              <ProductsSlider type={Slider.SUGGESTIONS} />
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
