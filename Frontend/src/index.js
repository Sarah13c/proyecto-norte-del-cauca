import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Register from "./pages/register";
import Login from "./pages/login";
import { ChakraProvider } from '@chakra-ui/react';
import Profile from './pages/dashboard/inicio';
import Accessibility from './pages/accessibility';
import AdminLayout from './layouts/dashboard';
import Health from './layouts/dashboard';
import Security from  './layouts/dashboard';
import Demography from  './layouts/dashboard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/flexboxgrid.min.css";
import './styles/index.css';
import theme from './theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';


import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/demography",
    element: <Demography />,
  },
  {
    path: "/security",
    element: <Security />,
  },
  {
    path: "/accessibility",
    element: <Accessibility />,
  },
  {
    path: "/profile",
    element: <Profile />,
   
  },
  {
    path: "/dashboard/*",
    element: <AdminLayout />,
   
  },
  {
    path: "/health",
    element: <Health />,
   
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ThemeEditorProvider>
    </React.StrictMode>,
  </ChakraProvider>,
);
reportWebVitals();