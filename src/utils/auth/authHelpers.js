// Funciones auxiliares para AuthContext

export function clearLocalStorageExcept(keysToKeep = []) {
    const preserved = {};
    keysToKeep.forEach((key) => {
        const value = localStorage.getItem(key);
        if (value !== null) preserved[key] = value;
    });
    localStorage.clear();
    Object.entries(preserved).forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });
}

// NOTA: Para centralizar el manejo de lastRoute, usa el hook useLastRouteManager en componentes/hook, no aquí directamente.
export function setUserLocalStorage(user) {
    if (!user) return;
    // Eliminar last_route antes de guardar el user en localStorage para evitar confusión
    const { last_route, ...userWithoutLastRoute } = user;
    localStorage.setItem('user', JSON.stringify(userWithoutLastRoute));
    // No actualizar last_route aquí. Toda la gestión de last_route debe ser centralizada en useLastRouteManager.
    if (user.language) {
        localStorage.setItem('lang', user.language);
    }
    if (user.theme) {
        localStorage.setItem('theme', user.theme);
    }
}