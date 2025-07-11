import { register } from '../auth.js';
import { navigateTo } from '../router.js';
export function renderRegister() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Registro de Usuario</h2>
    <form id="register-form">
      <input type="email" placeholder="Correo" required />
      <input type="password" placeholder="Contraseña" required />
      <select required>
        <option value="">Selecciona un rol</option>
        <option value="visitante">Visitante</option>
        <option value="bibliotecario">Bibliotecario</option>
      </select>
      <button>Registrarse</button>
    </form>
    <p>¿Ya tienes cuenta? <a href="/login" id="go-login">Inicia sesión</a></p>
  `;
  document.getElementById('go-login').addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/login');
  });
  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const [email, password, role] = e.target.elements;
    const user = {
      email: email.value,
      password: password.value,
      role: role.value
    };
    await register(user);
    alert('Usuario registrado con éxito');
    navigateTo('/login');
  });
}