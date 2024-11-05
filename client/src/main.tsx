import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Provider } from "../../src/components/ui/provider.tsx";
import App from './App.tsx';
import Home from './pages/Home.tsx';
import LandingPage from './pages/Landing.tsx';
import Login from './pages/Login.tsx';
import SavedEvents from './pages/SavedEvents.tsx';
import SignUp from './pages/SignUp.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import React from 'react';

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
        path: '/home',
        element: <Home />
      },
      {
        path: '/sign-up',
        element: <SignUp />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/saved-events',
        element: <SavedEvents />
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
