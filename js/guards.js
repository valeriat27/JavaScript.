export function requireAuth(path, user) {
  if (!user && path.startsWith('/dashboard')) return '/not-found';
  if (user && (path === '/login' || path === '/register')) return '/dashboard';
  if (path.startsWith('/dashboard/books') && user?.role !== 'bibliotecario') return '/not-found';
  return path;
}