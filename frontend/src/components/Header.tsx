import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
          >
            EcoFinds
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={RouterLink} to="/" onClick={handleClose}>
                  Home
                </MenuItem>
                {isAuthenticated ? (
                  <>
                    <MenuItem
                      component={RouterLink}
                      to="/create-product"
                      onClick={handleClose}
                    >
                      Create Listing
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/profile"
                      onClick={handleClose}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem
                      component={RouterLink}
                      to="/login"
                      onClick={handleClose}
                    >
                      Login
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/register"
                      onClick={handleClose}
                    >
                      Register
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" component={RouterLink} to="/">
                Home
              </Button>
              {isAuthenticated ? (
                <>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/create-product"
                  >
                    Create Listing
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/profile">
                    Profile
                  </Button>
                  <Button color="inherit" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={RouterLink} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/register">
                    Register
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;