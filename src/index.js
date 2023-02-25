import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import Projects from './components/pages/Projects';
import ErrorPage from './components/pages/ErrorPage';
import NewProject from './components/pages/NewProject';
import Project from './components/pages/Project';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path:"/",
    element: <Home/>,
      },
      {
        path:"/contact",
        element: <Contact/>,
      },
      {
        path:"/company",
        element: <Company/>,
      },
      {
        path:"/projects",
        element: <Projects/>,
      },
      {
        path:"/newproject",
        element: <NewProject/>,
      },
      {
        path:"/project/:id",
        element: <Project/>,
      },
     

    ]
  },
  
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)