import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MainListItems, secondaryListItems } from './list-items';
import AppBar from '../shared/app-bar';
import Drawer from '../shared/drawer';
import { UserContext } from '../libs/context/user-context';
import { useNavigate } from 'react-router';
import UserMenu from './user-menu';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface IPageLayoutProps{
  children: React.ReactNode;
}

const PageLayout = (props: IPageLayoutProps) => {
  const {children} = props;
  const { isSignedIn, handleLogout, user }= React.useContext(UserContext);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);


  React.useEffect(() => {
    if (!isSignedIn) {
      navigate('/');
    }
  }, [isSignedIn]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleClick}>
              <Badge badgeContent={4} color="secondary">
                <AccountCircleIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
      <UserMenu
        open={openMenu}
        anchorEl={anchorEl}
        handleClose={() => setAnchorEl(null)}
        handleLogout={handleLogout}
        user={user} />
    </ThemeProvider>
  );
}

export default PageLayout;