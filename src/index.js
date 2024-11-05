import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-stacked-toast';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BooksProvider } from './context/BooksContext';
import router from './routes';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <>
    <Toaster />
    <AuthProvider>
      <BooksProvider>
        <RouterProvider router={router}/>
      </BooksProvider>
    </AuthProvider>
  </>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
