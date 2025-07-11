const API_URL = 'http://localhost:3000/users';
export async function register(user) {
  const res = await fetch(API_URL,  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return res.json();
}
export async function login(email, password) {
  const res = await fetch(`${API_URL}?email=${email}&password=${password}`);
if (!res.ok) {
  throw new Error('Error en la conexión con el servidor');
}
  const data = await res.json();
  if (data.length > 0) {
    localStorage.setItem('user', JSON.stringify(data[0]));
    return data[0];
  } else {
    throw new Error('Credenciales inválidas');
  }
}
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}
export function logout() {
  localStorage.removeItem('user');
}