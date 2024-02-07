import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/Home';
// import ProductsByCategory from '../components/ProductsPage/Category'; // Import the component
import ProductPage from '../components/ProductPage/ProductPage';
import CategoryPage from '../components/CategoryPage/CategoryPage';
// import ReviewModal from '../components/Review'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
      },
      {
        path: "/category/:id",
        element: <CategoryPage />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
      },
    ],
  },
]);