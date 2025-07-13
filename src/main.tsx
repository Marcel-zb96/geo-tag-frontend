import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import Header from './component/header/Header.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Register from './page/register/Register.tsx';
import Login from './page/login/Login.tsx';
import GeoNoteMap from './page/map/GeoNoteMap.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
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
        element: <Login />
      },
      {
        path: "/map",
        element: <GeoNoteMap />
      }
    ]
  }
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

