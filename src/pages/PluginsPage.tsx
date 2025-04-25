import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Switch,
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Extension as ExtensionIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Plugin {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  version: string;
}

const PluginsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [plugins, setPlugins] = useState<Plugin[]>([
    {
      id: '1',
      name: 'Gaming Mode',
      description: 'Optimize search for gaming content',
      enabled: true,
      version: '1.0.0',
    },
    {
      id: '2',
      name: 'Advanced Filters',
      description: 'Add advanced filtering options to search results',
      enabled: false,
      version: '1.2.0',
    },
  ]);

  const handleTogglePlugin = (pluginId: string) => {
    setPlugins(plugins.map(plugin =>
      plugin.id === pluginId ? { ...plugin, enabled: !plugin.enabled } : plugin
    ));
  };

  const handleDeletePlugin = (pluginId: string) => {
    setPlugins(plugins.filter(plugin => plugin.id !== pluginId));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Plugins</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search plugins..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Paper elevation={0} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Installed Plugins</Typography>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={() => {/* Implement plugin installation */}}
          >
            Install Plugin
          </Button>
        </Box>

        <List>
          {plugins.map((plugin) => (
            <ListItem key={plugin.id}>
              <ListItemIcon>
                <ExtensionIcon />
              </ListItemIcon>
              <ListItemText
                primary={plugin.name}
                secondary={
                  <>
                    {plugin.description}
                    <Typography variant="caption" display="block">
                      Version: {plugin.version}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={plugin.enabled}
                  onChange={() => handleTogglePlugin(plugin.id)}
                />
                <IconButton
                  edge="end"
                  onClick={() => handleDeletePlugin(plugin.id)}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper elevation={0} sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Available Plugins</Typography>
        <Typography color="text.secondary">
          Browse and install new plugins from our plugin marketplace.
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => {/* Implement marketplace navigation */}}
        >
          Visit Plugin Marketplace
        </Button>
      </Paper>
    </Box>
  );
};

export default PluginsPage; 