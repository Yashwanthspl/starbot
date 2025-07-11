// src/App.js
import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import { auth } from './firebase';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: mode === 'light' ? '#f4f6fb' : '#181c24',
      paper: mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(30,34,44,0.7)',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => getTheme(mode), [mode]);
  const toggleColorMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  if (authLoading) return null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {user ? (
        <HomePage mode={mode} toggleColorMode={toggleColorMode} user={user} />
      ) : (
        <LoginPage onLogin={setUser} />
      )}
    </ThemeProvider>
  );
}

export default App;