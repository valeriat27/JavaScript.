import { navigateTo } from '../router.js';
export function renderNotFound() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>404 - Página no encontrada</h2>
    <p>No tienes permiso o la ruta no existe.</p>
    <button id="go-home">Ir al inicio</button>
  `;
  document.getElementById('go-home').addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    navigateTo(user ? '/dashboard' : '/login');
  });
}