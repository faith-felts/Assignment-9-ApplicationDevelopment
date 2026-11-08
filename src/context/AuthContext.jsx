import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

function getStoredUser() {
  const storedUser = localStorage.getItem('newsreader-user');
  if (!storedUser) {
    return null;
  }

  let user;
  try {
    user = JSON.parse(storedUser);
  } catch {
    return null;
  }

  if (
    typeof user?.username !== 'string' ||
    (user.role !== 'regular' && user.role !== 'admin')
  ) {
    return null;
  }

  return user;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem('newsreader-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('newsreader-user');
    }
  }, [user]);

  const login = (username, password, role = 'regular') => {
    const normalizedUsername = username.trim();
    if (!normalizedUsername || !password.trim()) {
      throw new Error('Username and password are required');
    }
    if (role !== 'regular' && role !== 'admin') {
      throw new Error('Invalid user role');
    }

    setUser({ username: normalizedUsername, role });
  };

  const logout = () => setUser(null);
  const isAuthenticated = () => user !== null;
  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
