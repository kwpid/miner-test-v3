import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Palette as PaletteIcon,
  Keyboard as KeyboardIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Settings</Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Appearance</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <PaletteIcon />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" />
            <Switch
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Notifications</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Enable Notifications" />
            <Switch
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Preferences</Typography>
        <List>
          <ListItem button onClick={() => {}}>
            <ListItemIcon>
              <KeyboardIcon />
            </ListItemIcon>
            <ListItemText primary="Keyboard Shortcuts" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => {}}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Language" />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={0} sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Security</Typography>
        <List>
          <ListItem button onClick={() => {}}>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="Privacy Settings" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default SettingsPage; 