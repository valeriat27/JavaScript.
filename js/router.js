import { renderLogin } from './views/login.js';
import { renderRegister } from './views/register.js';
import { renderDashboard } from './views/dashboard.js';
import { renderBooksCreate } from './views/booksCreate.js';
import { renderBooksEdit } from './views/booksEdit.js';
import { renderNotFound } from './views/notFound.js';
import { requireAuth } from './guards.js';

const routes = {
  '/login': renderLogin,
  '/register': renderRegister,
  '/dashboard': renderDashboard,
  '/dashboard/books/create': renderBooksCreate,
  '/dashboard/books/edit': renderBooksEdit,
  '/not-found': renderNotFound
};

function getBasePath(path) {
  // Quita parámetros de búsqueda y hash
  return path.split('?')[0].split('#')[0];
}

export function navigateTo(path) {
  const user = JSON.parse(localStorage.getItem('user'));
  const resolvedPath = requireAuth(getBasePath(path), user);
  history.pushState({}, '', path);
  const basePath = getBasePath(resolvedPath);
  const view = routes[basePath] || renderNotFound;
  view();
}
window.onpopstate = () => {
  navigateTo(location.pathname + location.search);
};