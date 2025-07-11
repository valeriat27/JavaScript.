import { getCurrentUser, logout } from '../auth.js';
import { api } from '../api.js';
import { navigateTo } from '../router.js';

export async function renderDashboard() {
  const user = getCurrentUser();
  const app = document.getElementById('app');
  const books = await api.getBooks();

  app.innerHTML = `
    <h2>Bienvenido, ${user.email} (${user.role})</h2>
    <button id="logout" type="button">Cerrar sesión</button>

    ${user.role === 'bibliotecario' ? `
      <button id="add-book" type="button">Agregar Libro</button>
      <ul>
        ${books.map(book => `
          <li>
            <strong>${book.title}</strong> de ${book.author}
            [${book.available ? 'Disponible' : 'No disponible'}]
            <button class="edit-book" data-id="${book.id}" type="button">Editar</button>
            <button class="delete-book" data-id="${book.id}" type="button">Eliminar</button>
          </li>
        `).join('')}
      </ul>
    ` : `
      <ul>
        ${books.map(book => `
          <li>
            <strong>${book.title}</strong> de ${book.author}
            [${book.available ? 'Disponible' : 'Reservado'}]
            ${book.available ? `<button class="reserve" data-id="${book.id}" type="button">Reservar</button>` : ''}
          </li>
        `).join('')}
      </ul>
    `}
  `;

  // Cerrar sesión
  document.getElementById('logout').addEventListener('click', () => {
    logout();
    navigateTo('/login');
  });

  // Si es bibliotecario, habilitar botones especiales
  if (user.role === 'bibliotecario') {
    // Ir al formulario para agregar libro
    document.getElementById('add-book').addEventListener('click', () => {
      navigateTo('/dashboard/books/create');
    });

    // Editar libro
    document.querySelectorAll('.edit-book').forEach(btn => {
      btn.addEventListener('click', () => {
        navigateTo('/dashboard/books/edit?id=' + btn.dataset.id);
        
      });
    });

    // Eliminar libro (sin redirigir ni recargar)
    document.querySelectorAll('.delete-book').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este libro?');
        if (confirmDelete) {
          await api.deleteBook(btn.dataset.id);
          renderDashboard(); // Recarga la vista actualizada sin cambiar de ruta
        }
      });
    });
  }

  // Reservar libro (si es visitante)
  if (user.role === 'visitante') {
    document.querySelectorAll('.reserve').forEach(btn => {
      btn.addEventListener('click', async () => {
        await api.reserveBook(btn.dataset.id);
        renderDashboard(); // Actualiza vista tras reservar
      });
    });
  }
}
