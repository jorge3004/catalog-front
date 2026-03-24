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

export function setUserLocalStorage(user) {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
    if (user.lastRoute) {
        localStorage.setItem('lastRoute', user.lastRoute);
    }
    if (user.language) {
        localStorage.setItem('lang', user.language);
    }
    if (user.theme) {
        localStorage.setItem('theme', user.theme);
    }
}