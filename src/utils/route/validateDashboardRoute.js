// Valida y normaliza rutas para el dashboard
export function validateDashboardRoute(route) {
    if (!route || typeof route !== 'string') return '/dashboard';
    let r = route.startsWith('/') ? route : '/' + route;
    if (!r.startsWith('/dashboard')) return '/dashboard';
    return r;
}
