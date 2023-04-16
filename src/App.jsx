import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { DetailsPage } from './pages/DetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const [countries, setCountries] = useState([]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: '',
      children: [
        {
          index: true,
          element: (
            <HomePage countries={countries} setCountries={setCountries} />
          ),
        },
        { path: '/country/:name', element: <DetailsPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
