import { Home } from 'pages/Home';
import { NotFount } from 'pages/NotFound';
import { Character } from 'pages/Character';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/:id', element: <Character /> },
  { path: '/*', element: <NotFount /> },
]);
