import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import PluginsPage from './pages/PluginsPage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#58a6ff',
    },
    secondary: {
      main: '#f78166',
    },
    background: {
      default: '#0d1117',
      paper: '#161b22',
    },
    text: {
      primary: '#c9d1d9',
      secondary: '#8b949e',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/plugins" element={<PluginsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 