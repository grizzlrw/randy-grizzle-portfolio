"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { Divider, useMediaQuery, useTheme, Fab } from "@mui/material";
import Home from '@mui/icons-material/Home';
import { Navigation } from "@mui/icons-material";
import { usePathname } from 'next/navigation';


const drawerWidth = 240;

type FormLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export default function ClippedDrawer({ links }: { links: FormLink[] }) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <>
      <Toolbar />
      <List>
        {links.map((link, index) => (
          (link.label !== "Divider" ? (
            <ListItem key={link.href} disablePadding>
              <ListItemButton 
                component={Link} 
                href={link.href}
                onClick={isMobile ? handleDrawerToggle : undefined}
              >
                {link.icon && <ListItemIcon sx={{ color: link.href === pathname ? "primary.main" : "text.primary" }}>
                  {link.icon}
                </ListItemIcon>}
                <ListItemText primary={link.label} sx={{ color: link.href === pathname ? "primary.main" : "text.primary" }} />
              </ListItemButton>
            </ListItem>
          ) : (
            <Divider key={index} />
          ))))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex", height: "100%", position: 'relative' }}>
      <CssBaseline />
      
      {/* Floating Action Button for mobile - only shows when drawer is closed */}
      {isMobile && !mobileOpen && (
        <Fab
          color="primary"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: theme.zIndex.speedDial,
          }}
        >
          <MenuIcon />
        </Fab>
      )}
      
      {/* Mobile drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Desktop drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              zIndex: 0,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}
