import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  InputAdornment,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Settings as SettingsIcon,
  Extension as ExtensionIcon,
  AccountCircle as AccountIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchor(null);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent' }}>
        <Toolbar sx={{ justifyContent: 'flex-end', gap: 2 }}>
          <IconButton onClick={() => navigate('/plugins')} color="inherit">
            <ExtensionIcon />
          </IconButton>
          <IconButton onClick={handleSettingsClick} color="inherit">
            <SettingsIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          maxWidth: 800,
          mx: 'auto',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 4,
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Modern Search
        </Typography>

        <Box component="form" onSubmit={handleSearch} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search the web..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 4,
                backgroundColor: theme.palette.background.paper,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary">
            Search
          </Button>
          <Button variant="outlined" color="primary">
            I'm Feeling Lucky
          </Button>
        </Box>
      </Box>

      <Menu
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={handleSettingsClose}
      >
        <MenuItem onClick={() => { handleSettingsClose(); navigate('/settings'); }}>
          Settings
        </MenuItem>
        <MenuItem onClick={() => { handleSettingsClose(); navigate('/plugins'); }}>
          Plugins
        </MenuItem>
        <MenuItem onClick={handleSettingsClose}>Appearance</MenuItem>
        <MenuItem onClick={handleSettingsClose}>Keyboard Shortcuts</MenuItem>
      </Menu>
    </Box>
  );
};

export default SearchPage; 