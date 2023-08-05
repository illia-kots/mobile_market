import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useAppSelector } from '../../app/hooks';
import { BackButton } from '../../components/BackButton';
import { CartCheckout } from '../../components/CartCheckout';
import { ErrorNotification } from '../../components/ErrorNotification';
import { Loader } from '../../components/Loader';
import { ProductCart } from '../../components/ProductCart';
import { getUniqueItems } from '../../helpers/getUniqueItems';
import { Product } from '../../types/Product';

export const CartPage = () => {
  const { cart } = useAppSelector(state => state.favoriteAndCartProducts);
  const { loaded, isError } = useAppSelector(state => state.products);
  const { isDarkMode } = useAppSelector(state => state.theme);

  const [cartList, setCartList] = useState<Product[]>([]);

  const cartItems = () => {
    const list = getUniqueItems(cart, (item: Product) => item.id);

    setCartList(list);
  };

  useEffect(() => {
    cartItems();
  }, [cart.length]);

  return (
    <>
      {loaded ? (
        <>
          <BackButton />

          {isError ? (
            <ErrorNotification error={isError} />
          ) : (
            <div className="
              grid__item--tablet-1-12
              grid__item--desktop-1-24"
            >
              <section className="
                page__section
                cart"
              >
                <h1 className={classNames(
                  'page__section-title',
                  'cart__title',
                  { 'page__section-title--dark': isDarkMode },
                )}
                >
                  Cart
                </h1>

                {cartList.length ? (
                  <div className="
                    cart__container
                    grid grid--desktop"
                  >
                    <ul className="
                      cart__list
                      grid__item--tablet-1-12
                      grid__item--desktop-1-16"
                    >
                      <TransitionGroup>
                        {cartList.map(product => (
                          <CSSTransition
                            key={product.id}
                            timeout={500}
                            classNames="item"
                          >
                            <ProductCart
                              key={product.id}
                              product={product}
                            />
                          </CSSTransition>
                        ))}
                      </TransitionGroup>
                    </ul>

                    <CartCheckout />
                  </div>
                ) : (
                  <h2 className={classNames(
                    'cart__empty-title',
                    { 'cart__empty-title--dark': isDarkMode },
                  )}
                  >
                    Your cart is empty...
                  </h2>
                )}
              </section>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
