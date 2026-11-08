import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const demoAccounts = {
  testuser: { password: '1234', role: 'regular' },
  Admin123: { password: '123', role: 'admin' },
};

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
    demoAccounts[user.username]?.role !== user.role
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

  const login = (username, password) => {
    const normalizedUsername = username.trim();
    const account = demoAccounts[normalizedUsername];
    if (!account || password !== account.password) {
      throw new Error('Invalid username or password');
    }

    setUser({ username: normalizedUsername, role: account.role });
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
