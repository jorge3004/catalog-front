// apiService.js
// Servicio base para peticiones HTTP a la API backend

const API_BASE_URL = process.env.REACT_APP_API_URL;
if (!API_BASE_URL) {
  throw new Error('REACT_APP_API_URL no está definida en el entorno. Por favor, configura la variable en tu archivo .env del frontend.');
}

const apiService = {
  async login({ username, password }) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
      throw new Error('Error en la autenticación');
    }
    return response.json();
  },
  // Puedes agregar más métodos aquí (getUser, register, forgotPassword, etc.)
};

export default apiService;
