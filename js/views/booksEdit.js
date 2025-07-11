import { api } from '../api.js';
import { navigateTo } from '../router.js';
export async function renderBooksEdit() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const app = document.getElementById('app');
  if (!id) {
    app.innerHTML = '<p>Parámetro "id" de libro no proporcionado.</p><button id="cancel" type="button">Volver</button>';
    document.getElementById('cancel').addEventListener('click', () => navigateTo('/dashboard'));
    return;
  }
  let book;
  try {
    book = await api.getBook(id);
  } catch (err) {
    app.innerHTML = '<p>Error al cargar el libro.</p><button id="cancel" type="button">Volver</button>';
    document.getElementById('cancel').addEventListener('click', () => navigateTo('/dashboard'));
    return;
  }
  if (!book || !book.title) {
    app.innerHTML = '<p>Libro no encontrado.</p><button id="cancel" type="button">Volver</button>';
    document.getElementById('cancel').addEventListener('click', () => navigateTo('/dashboard'));
    return;
  }
  app.innerHTML = `
    <h2>Editar Libro</h2>
    <form id="edit-form">
      <input type="text" name="title" value="${book.title}" required />
      <input type="text" name="author" value="${book.author}" required />
      <label>
        Disponible:
        <input type="checkbox" name="available" ${book.available ? 'checked' : ''} />
      </label>
      <button type="submit">Actualizar</button>
    </form>
    <button id="cancel" type="button">Cancelar</button>
    <div id="edit-error" style="color:red;"></div>
  `;
  document.getElementById('edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedBook = {
      title: form.title.value,
      author: form.author.value,
      available: form.available.checked
    };
    try {
      await api.updateBook(id, updatedBook);
      navigateTo('/dashboard');
    } catch (err) {
      document.getElementById('edit-error').innerText = 'Error al actualizar el libro.';
    }
  });
  document.getElementById('cancel').addEventListener('click', () => {
    navigateTo('/dashboard');
  });
}
