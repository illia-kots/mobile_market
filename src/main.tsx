import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import { App } from './App';
import { store } from './app/store';
import { CartPage } from './pages/CartPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';

const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<App />}
        >
          <Route
            path="*"
            element={<NotFoundPage />}
          />

          <Route
            index
            element={<HomePage />}
          />
          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="phones"
            element={<ProductsPage />}
          />
          <Route
            path="phones/:productId"
            element={<ProductDetailsPage />}
          />

          <Route
            path="tablets"
            element={<ProductsPage />}
          />
          <Route
            path="tablets/:productId"
            element={<ProductDetailsPage />}
          />

          <Route
            path="accessories"
            element={<ProductsPage />}
          />
          <Route
            path="accessories/:productId"
            element={<ProductDetailsPage />}
          />

          <Route
            path="favorites"
            element={<ProductsPage />}
          />

          <Route
            path="cart"
            element={<CartPage />}
          />
        </Route>
      </Routes>
    </Router>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
