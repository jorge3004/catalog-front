import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const [hasSession, setHasSession] = useState(false);
  const [sessionReason, setSessionReason] = useState(null); // 'no-token', 'invalid-token', 'expired-token', null

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    if (!apiUrl) {
      setApiError(true);
      setApiErrorMsg(
        'No server URL configured. Please contact the administrator.',
      );
      setLoading(false);
      return;
    }
    // Check if the API is alive using /health endpoint
    fetch(apiUrl + '/health')
      .then((res) => {
        if (!res.ok) {
          setApiError(true);
          setApiErrorMsg(
            'Server is not responding correctly. Please contact the administrator.',
          );
          setLoading(false);
        } else {
          // If API is alive, continue with authentication logic
          const token = localStorage.getItem('token');
          if (token) {
            fetch(apiUrl + '/users/me', {
              headers: { Authorization: `Bearer ${token}` },
            })
              .then(async (res) => {
                if (res.status === 401) {
                  // Token inválido o expirado
                  setUser(false);
                  setHasSession(false);
                  setSessionReason('invalid-token');
                  // Guardar lang y theme antes de limpiar localStorage
                  const prevLang = localStorage.getItem('lang');
                  const prevTheme = localStorage.getItem('theme');
                  localStorage.clear();
                  if (prevLang) {
                    localStorage.setItem('lang', prevLang);
                  }
                  if (prevTheme) {
                    localStorage.setItem('theme', prevTheme);
                  }
                  setLoading(false);
                  return;
                }
                const data = await res.json().catch(() => null);
                if (data && data.user) {
                  setUser(data.user);
                  localStorage.setItem('user', JSON.stringify(data.user));
                  // Guardar lastRoute si viene del backend
                  if (data.user.lastRoute) {
                    localStorage.setItem('lastRoute', data.user.lastRoute);
                  }
                  // Guardar lang si no existe o es diferente
                  if (data.user.language) {
                    const currentLang = localStorage.getItem('lang');
                    if (!currentLang || currentLang !== data.user.language) {
                      localStorage.setItem('lang', data.user.language);
                    }
                  }
                  // Guardar theme si no existe o es diferente
                  if (data.user.theme) {
                    const currentTheme = localStorage.getItem('theme');
                    if (!currentTheme || currentTheme !== data.user.theme) {
                      localStorage.setItem('theme', data.user.theme);
                    }
                  }
                  setHasSession(true);
                  setSessionReason(null);
                } else {
                  setUser(false);
                  setHasSession(false);
                  setSessionReason('invalid-token');
                }
                setLoading(false);
              })
              .catch(() => {
                setUser(false);
                setHasSession(false);
                setSessionReason('invalid-token');
                const prevLang = localStorage.getItem('lang');
                const prevTheme = localStorage.getItem('theme');
                localStorage.clear();
                if (prevLang) {
                  localStorage.setItem('lang', prevLang);
                }
                if (prevTheme) {
                  localStorage.setItem('theme', prevTheme);
                }
                setLoading(false);
              });
          } else {
            setUser(false);
            setHasSession(false);
            setSessionReason('no-token');
            const prevLang = localStorage.getItem('lang');
            const prevTheme = localStorage.getItem('theme');
            localStorage.clear();
            if (prevLang) {
              localStorage.setItem('lang', prevLang);
            }
            if (prevTheme) {
              localStorage.setItem('theme', prevTheme);
            }
            setLoading(false);
          }
        }
      })
      .catch(() => {
        setApiError(true);
        setApiErrorMsg(
          'Could not connect to the server. Please check your connection or contact the administrator.',
        );
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        apiError,
        apiErrorMsg,
        hasSession,
        sessionReason,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { AuthContext };
