import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link'
import Image from "next/image";
import GrizzleLogo from '@/app/assets/vectors/GrizzleLogo.svg';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [{ label: 'About Me', href: '/about' }, { label: 'Contact', href: '/contact' }];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

 

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      
      {/* <Link href="/">
        <Box sx={{ backgroundColor: 'primary.main', py: 1 }}>
          <Image
              src="/assets/vectors/GrizzleLogo.svg"
              alt="Grizzle Logo"
              width={30}
              height={30}
              style={{ display: 'inline' }}
              className="mr-2"
            />

          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              // display: { xs: 'none', md: 'flex' },
              color: '#ffffff',
              textDecoration: 'none',
            }}
          >
            Randy Grizzle
          </Typography>
        </Box>
      </Link> */}
      

      
      {/* <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography> */}
      <Divider />
      <List>
        <ListItem key='home' disablePadding>
          <ListItemButton href="/" sx={{ textAlign: 'left' }}>
            <ListItemText primary='Randy Grizzle' />
          </ListItemButton>
        </ListItem>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton href={item.href} sx={{ textAlign: 'left' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" 
        sx={{ backgroundColor: 'primary.50', color: '#000' }}
        style={{ boxShadow: 'inset 0 -4px 5px -5px rgba(0, 0, 0, 0.5)' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Image
            src="/GrizzleLogo.svg"
            alt="Grizzle Logo"
            width={30}
            height={30}
            style={{ display: 'block' }}
            className="mr-2"
          />

          <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{ my: 2, mr: 2, display: 'block' }}
            >
              Randy Grizzle
          </Typography>
          
          {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              /* Property of Button that I don't think would exist here onClick={handleDrawerToggle} */
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                sx={{ my: 2, display: 'block', color: '#000' }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}