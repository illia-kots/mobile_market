# Mobile market

## [DEMO LINK](https://illia-kots.github.io/mobile_market/#/)

# Project purpose
Implement Products market according to [this design](https://www.figma.com/file/uEetgWenSRxk9jgiym6Yzp/Phone-catalog-redesign?node-id=1%3A2).
Implement functionality such as `fetching data` from the `REST API`, storing products in the cart and the favorites in the `localStorage`.

# Project task
  - Design and implement your own responsive tablet and mobile layout according to the available desktop markup;
  - Fetch products from API:
      - Create `getHotPriceProducts` method fetching products with discounts from API sorted by absolute discount value (not percentage given in API);
      - Create `getBrandNewProducts` method fetching products without a discount from the API starting from the most expensive;
      - Create `getSuggestedProducts` method fetching the suggested products;
  - Create `ProductsSlider` component and use it in `Hot prices`/`Brand new`/`You may also like` blocks;
  - Save the `Cart`/`Favorites` to the `localSotrage` on each change and read it on page load;
  - Create a `SearchBar` component with an input into the `<header>` to filter products.
      - It should work with pagination and sorting;
      - Save `Search` params in the URL using `queryParams` (`?query=moto`) and apply them on page load;
  - Add the ability to sort the products by `age` (`Newest`, `value="age"`), `name` (`Alphabetically`, `value="name"`), and `price` (`Cheapest`, `value="price"`) using `<select>` element. Also, save sort order in the URL `?sort=age` and apply it after the page reload
  - Add `Pagination` and `Items on page` using elements with `4`, `8`, `16`, and `all` options.
      - It should limit the products you show to the user;
      - Hide all the pagination elements if there are a few items (less than 1 smallest page size);
      - Save `?page=2&perPage=8` in the URL and apply them after the page reload;
  - Add `NotFoundPage` containing text `Page not found`;
  - Create `Light` and `Dark` mode for the interface;

# Tech stack
  - ReactJS;
  - Redux Toolkit;
  - React Router;
  - JavaScript;
  - TypeScript;
  - HTML;
  - CSS/SCSS;
  - BEM;
  - REST API;
  - Fetch;
  - localStorage.

# Short preview
## Home page
![Home page](./readme/preview/home-page.gif)

![Home page](./readme/preview/responsive-home-page.gif)

![Home page](./readme/preview/darkmode-home-page.gif)

## Not Found page
![Not Found page](./readme/preview/not-found-page.gif)
