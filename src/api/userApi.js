// Login de usuario
export async function loginUser({ username, password, last_route }) {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, last_route }),
        });
        const data = await res.json().catch(() => ({}));
        return { ok: res.ok, status: res.status, data };
    } catch (err) {
        return { ok: false, status: 0, data: { message: 'Network error' } };
    }
}
// Cambiar rol de usuario (requiere token y ser admin)
export async function updateUserRole({ userId, role, token }) {
    const res = await fetch(`${API_URL}/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) {
        throw new Error(data.message || 'Error al actualizar rol');
    }
    return data;
}

const API_URL = process.env.REACT_APP_API_URL || '/api';

export async function registerUser({ preferred_name, last_name, password }) {
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferred_name, last_name, password }),
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || 'Error al registrar usuario');
    }
    return res.json();
}

// Obtener todos los usuarios (requiere token)
export async function getUsers(token) {
    const res = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) {
        throw new Error(data.message || 'Error al obtener usuarios');
    }
    return data.users;
}

// Aprobar usuario (requiere token y ser admin)
export async function approveUser({ userId, token }) {
    const res = await fetch(`${API_URL}/users/${userId}/approve`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) {
        throw new Error(data.message || 'Error al aprobar usuario');
    }
    return data;
}
