import classNames from 'classnames';
import {
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import productCategoryList from '../../api/productCategories.json';
import { SIZE_DESKTOP_WIDE, SIZE_MOBILE, SIZE_TABLET } from '../../app/consts';
import { useAppSelector, useWindowSize } from '../../app/hooks';
import { Product } from '../../types/Product';
import { CategoryType } from '../../types/ProductCategory';
import { SelectorType } from '../../types/SelectorType';
import { SortBy } from '../../types/SortedBy';
import { capitalizedText } from '../../utils/capitalizedText';
import { DownDrops } from '../DownDrops';
import { NoSearchResults } from '../NoSearchResults';
import { Pagination } from '../Pagination/Pagination';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';

export const ProductsList: React.FC = () => {
  const { items, loaded } = useAppSelector(state => state.products);
  const { favorites } = useAppSelector(state => state.favoriteAndCartProducts);
  const { isDarkMode } = useAppSelector(state => state.theme);
  const { width } = useWindowSize();

  const location = useLocation();
  const currPageTitle = location.pathname.slice(1);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') as SortBy || '';
  const currentPage = searchParams.get('page') || '';
  const perPage = searchParams.get('perPage') || '';

  const [category, setCategory] = useState<CategoryType | null>(null);
  const [categoryProductList, setCategoryProductList] = useState<Product[]>([]);
  const [itemsInList, setItemsInList] = useState(1);

  const getSortedProducts = (initialList: Product[]) => {
    let sortedProducts = (currPageTitle === 'favorites')
      ? [...favorites]
      : [...initialList];

    if (query) {
      const lowerQuery = query.toLowerCase().trim();

      sortedProducts = sortedProducts.filter(searchedProduct => (
        searchedProduct.name.toLowerCase().includes(lowerQuery)
      ));
    }

    if (sortedProducts.length && sort) {
      switch (sort) {
        case SortBy.PRICE:
          sortedProducts.sort(
            (firstItem, secondItem) => firstItem[sort] - secondItem[sort],
          );
          break;

        case SortBy.YEAR:
          sortedProducts.sort(
            (firstItem, secondItem) => secondItem[sort] - firstItem[sort],
          );
          break;

        default:
          sortedProducts.sort(
            (firstItem, secondItem) => firstItem[sort]
              .localeCompare(secondItem[sort]),
          );
          break;
      }
    }

    return sortedProducts || null;
  };

  const sortedProductsList = getSortedProducts(categoryProductList);

  const getCategory = () => {
    const currCategoryName = productCategoryList.filter(
      (cat) => cat.type === currPageTitle,
    )[0];

    setCategory(currCategoryName);
  };

  const getCategoryProducts = () => {
    if (category) {
      const categoryItems = items.filter(
        (product) => product.category === category.type,
      );

      setCategoryProductList(categoryItems);
    } else {
      setCategoryProductList([]);
    }
  };

  const isFavoritePage = currPageTitle === 'favorites';

  const pageTitle = (currPageTitle === 'favorites')
    ? 'Favorites'
    : category?.title;

  const totalModels = (currPageTitle === 'favorites')
    ? favorites.length
    : categoryProductList.length;

  let startItems = 0;
  let endItems = sortedProductsList.length;

  if (currentPage && perPage) {
    const start = (+currentPage - 1) * +perPage;
    const end = start + (+perPage);

    startItems = Math.max(0, start);
    endItems = Math.min(sortedProductsList.length, end);
  }

  const getVisibleItems = sortedProductsList.slice(startItems, endItems);

  const noResultsTitle = useMemo(() => {
    if (currPageTitle === 'favorites') {
      return 'Favorite item';
    }

    if (!category) {
      return 'Searching item';
    }

    return capitalizedText(category.itemType);
  }, [category]);

  const productListSettings = {
    itemWidth: 288,
    itemsOnPage: itemsInList,
  };

  const {
    itemWidth,
    itemsOnPage,
  } = productListSettings;

  const productListWidth = () => {
    switch (true) {
      case width > SIZE_DESKTOP_WIDE:
        setItemsInList(4);
        break;
      case width > SIZE_TABLET:
        setItemsInList(3);
        break;
      case width > SIZE_MOBILE:
        setItemsInList(2);
        break;
      default:
        setItemsInList(1);
    }
  };

  useEffect(() => {
    getCategory();
  }, [location]);

  useEffect(() => {
    getCategoryProducts();
  }, [category, items]);

  useEffect(() => {
    productListWidth();
  }, [width]);

  return (
    <section className="
      page__section
      products
      grid__item--tablet-1-12
      grid__item--desktop-1-24"
    >
      {!query && (
        <h1 className={classNames(
          'page__section-title',
          'products__title',
          { 'page__section-title--dark': isDarkMode },
        )}
        >
          {pageTitle}
        </h1>
      )}

      <div className={classNames(
        'products__total',
        { 'products__total--dark': isDarkMode },
      )}
      >
        {query
          ? `${getVisibleItems.length} result${getVisibleItems.length === 1 ? '' : 's'}`
          : `${totalModels} model${totalModels === 1 ? '' : 's'}`}
      </div>

      {!isFavoritePage
        && !query
        && !!getVisibleItems.length
        && (
          <div className="
            products__selector
            selector"
          >
            <DownDrops type={SelectorType.SORT__BY} />

            <DownDrops type={SelectorType.ITEMS__ONPAGE} />
          </div>
        )}

      <div className="products__items">
        {!!getVisibleItems.length && (
          <div
            className="products__container"
            data-cy="productList"
            style={{
              maxWidth: `${itemsOnPage * itemWidth}px`,
            }}
          >
            {getVisibleItems.map(item => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))}
          </div>
        )}
      </div>

      {!getVisibleItems.length && loaded && (
        <NoSearchResults title={noResultsTitle} />
      )}

      {!isFavoritePage
        && !query
        && !!getVisibleItems.length
        && (
          <div
            className="products__pagination"
            data-cy="pagination"
          >
            <Pagination total={sortedProductsList.length} />
          </div>
        )}
    </section>
  );
};
