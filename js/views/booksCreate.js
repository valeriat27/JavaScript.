import { api } from '../api.js';
import { navigateTo } from '../router.js';
export function renderBooksCreate() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Agregar Libro</h2>
    <form id="book-form">
      <input type="text" placeholder="Título" required />
      <input type="text" placeholder="Autor" required />
      <button>Guardar</button>
    </form>
    <button id="cancel">Cancelar</button>
  `;
  document.getElementById('book-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const [title, author] = e.target.elements;
    await api.createBook({
      title: title.value,
      author: author.value,
      available: true
    });
    navigateTo('/dashboard');
  });
  document.getElementById('cancel').addEventListener('click', () => {
    navigateTo('/dashboard');
  });
}