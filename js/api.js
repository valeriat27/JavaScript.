const BASE = 'http://localhost:3000';
export const api = {
  async getBooks() {
    const res = await fetch(`${BASE}/books`);
    return res.json();
  },
  async getBook(id) {
    const res = await fetch(`${BASE}/books/${id}`);
    return res.json();
  },
  async createBook(book) {
    return fetch(`${BASE}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    });
  },
  async updateBook(id, book) {
    return fetch(`${BASE}/books/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    });
  },
  async deleteBook(id) {
    return fetch(`${BASE}/books/${id}`, { method: 'DELETE' });
  },
  async reserveBook(id) {
    // Marca el libro como no disponible
    return fetch(`${BASE}/books/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available: false })
    });
  }
};