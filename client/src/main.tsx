import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Provider } from "../src/components/ui/provider.tsx";
import App from './App.tsx';
import Home from './pages/Home.tsx';
import LandingPage from './pages/Landing.tsx';
import Login from './pages/Login.tsx';
import SavedEvents from './pages/SavedEvents.tsx';
import SignUp from './pages/SignUp.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import React from 'react';
import AboutAline from './pages/AboutAline.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />
      }, 
      {
        path: '/Home',
        element: <Home />
      },
      {
        path: '/SignUp',
        element: <SignUp />
      },
      {
        path: '/Login',
        element: <Login />
      },
      {
        path: '/SavedEvents',
        element: <SavedEvents />
      },
      {
        path: '/AboutAline',
        element: <AboutAline />
      }
    ]
  }
])

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
    <Provider> 
    <RouterProvider router={router} />
  </Provider>
  </React.StrictMode>,
  );  
}
