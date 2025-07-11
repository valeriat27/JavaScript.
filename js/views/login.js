import { login } from '../auth.js';
import { navigateTo } from '../router.js';
export function renderLogin() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Iniciar Sesión</h2>
    <form id="login-form">
      <input type="email" placeholder="Correo" required />
      <input type="password" placeholder="Contraseña" required />
      <button>Ingresar</button>
    </form>
    <p>¿No tienes cuenta? <a href="/register" id="go-register">Regístrate</a></p>
  `;
  document.getElementById('go-register').addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/register');
  });
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const [email, password] = e.target.elements;
    try {
      await login(email.value, password.value);
      navigateTo('/dashboard');
    } catch {
      alert('Correo o contraseña incorrectos');
    }
  });
}