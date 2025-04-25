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
  Paper,
  Grid,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  Settings as SettingsIcon,
  Extension as ExtensionIcon,
  AccountCircle as AccountIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);
  const [isAddTabOpen, setIsAddTabOpen] = useState(false);
  const [newTab, setNewTab] = useState({ name: '', url: '' });
  const theme = useTheme();
  const navigate = useNavigate();
  const { quickTabs, addQuickTab, removeQuickTab, updateQuickTab } = useStore();

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchor(null);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  const handleImFeelingLucky = () => {
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&btnI=I%27m+Feeling+Lucky`, '_blank');
    }
  };

  const handleAddTab = () => {
    if (newTab.name && newTab.url) {
      addQuickTab(newTab);
      setNewTab({ name: '', url: '' });
      setIsAddTabOpen(false);
    }
  };

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}`;
    } catch {
      return '';
    }
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
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="outlined" color="primary" onClick={handleImFeelingLucky}>
            I'm Feeling Lucky
          </Button>
        </Box>

        {quickTabs.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              mt: 6,
              p: 2,
              width: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Quick Tabs</Typography>
              <IconButton onClick={() => setIsAddTabOpen(true)} color="primary">
                <AddIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              {quickTabs.map((tab) => (
                <Grid item xs={12} sm={6} md={4} key={tab.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                    onClick={() => window.open(tab.url, '_blank')}
                  >
                    <Avatar src={getFaviconUrl(tab.url)} sx={{ width: 32, height: 32 }}>
                      {tab.name[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1">{tab.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {tab.url}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeQuickTab(tab.id);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
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

      <Dialog open={isAddTabOpen} onClose={() => setIsAddTabOpen(false)}>
        <DialogTitle>Add Quick Tab</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newTab.name}
            onChange={(e) => setNewTab({ ...newTab, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="URL"
            fullWidth
            value={newTab.url}
            onChange={(e) => setNewTab({ ...newTab, url: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddTabOpen(false)}>Cancel</Button>
          <Button onClick={handleAddTab} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SearchPage; 