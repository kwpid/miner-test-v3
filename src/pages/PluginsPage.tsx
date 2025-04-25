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
  Chip,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Extension as ExtensionIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  SportsEsports as GamingIcon,
  FilterAlt as FilterIcon,
  DarkMode as DarkModeIcon,
  Block as AdBlockIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';

interface Plugin {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  version: string;
  icon?: React.ReactNode;
  features?: string[];
}

const PluginsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { plugins, togglePlugin } = useStore();

  const availablePlugins: Plugin[] = [
    {
      id: '1',
      name: 'Gaming Mode',
      description: 'Optimize search for gaming content and performance',
      enabled: plugins.find(p => p.id === '1')?.enabled || false,
      version: '1.0.0',
      icon: <GamingIcon />,
      features: ['Gaming-focused search results', 'Performance optimization', 'Gaming news integration'],
    },
    {
      id: '2',
      name: 'Advanced Filters',
      description: 'Add advanced filtering options to search results',
      enabled: plugins.find(p => p.id === '2')?.enabled || false,
      version: '1.2.0',
      icon: <FilterIcon />,
      features: ['Custom filters', 'Time-based filtering', 'Content type filtering'],
    },
    {
      id: '3',
      name: 'Quick-Tabs',
      description: 'Add quick access tabs for your favorite websites',
      enabled: plugins.find(p => p.id === '3')?.enabled || false,
      version: '1.0.0',
      icon: <ExtensionIcon />,
      features: ['Customizable tabs', 'Favicon support', 'Quick access'],
    },
    {
      id: '4',
      name: 'Dark Reader',
      description: 'Automatically darkens websites for better night viewing',
      enabled: plugins.find(p => p.id === '4')?.enabled || false,
      version: '1.0.0',
      icon: <DarkModeIcon />,
      features: ['Automatic dark mode', 'Custom themes', 'Eye protection'],
    },
    {
      id: '5',
      name: 'Ad Blocker',
      description: 'Blocks intrusive ads and trackers',
      enabled: plugins.find(p => p.id === '5')?.enabled || false,
      version: '1.0.0',
      icon: <AdBlockIcon />,
      features: ['Ad blocking', 'Tracker blocking', 'Privacy protection'],
    },
    {
      id: '6',
      name: 'Performance Booster',
      description: 'Optimize browser performance and loading times',
      enabled: false,
      version: '1.0.0',
      icon: <SpeedIcon />,
      features: ['Resource optimization', 'Cache management', 'Loading speed boost'],
    },
  ];

  const filteredPlugins = availablePlugins.filter(plugin =>
    plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plugin.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {filteredPlugins.map((plugin) => (
            <ListItem key={plugin.id}>
              <ListItemIcon>
                {plugin.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {plugin.name}
                    <Chip
                      label={`v${plugin.version}`}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                }
                secondary={
                  <>
                    {plugin.description}
                    {plugin.features && (
                      <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {plugin.features.map((feature, index) => (
                          <Tooltip key={index} title={feature}>
                            <Chip
                              label={feature}
                              size="small"
                              variant="outlined"
                            />
                          </Tooltip>
                        ))}
                      </Box>
                    )}
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={plugin.enabled}
                  onChange={() => togglePlugin(plugin.id)}
                />
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