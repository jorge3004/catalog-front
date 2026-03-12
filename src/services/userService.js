// userService.js
// Servicio para manejar autenticación y usuario actual
import apiService from './apiService';

const TOKEN_KEY = 'authToken';

const userService = {
  async login(username, password) {
    const data = await apiService.login({ username, password });
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
      return data;
    } else {
      throw new Error(data.message || 'Login fallido');
    }
  },
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },
  // Puedes agregar más métodos aquí (getCurrentUser, isAuthenticated, etc.)
};

export default userService;
