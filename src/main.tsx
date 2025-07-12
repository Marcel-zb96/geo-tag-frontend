import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import React from 'react'

const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
    children: [
      {
        path: "/",
        element: <App />,
      }
    ]
  }
]);

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

