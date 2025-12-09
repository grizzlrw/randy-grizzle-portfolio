"use client";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Link from "next/link";
import { Divider } from "@mui/material";
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
  return (
    <Box sx={{ display: "flex", height: "100%", zIndex: 0 }}>
      <CssBaseline />
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
        <Toolbar />
        <List>
          {links.map((link, index) => (
            (link.label !== "Divider" ? (
                 <ListItem key={link.href} disablePadding>
              <ListItemButton component={Link} href={link.href}>
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
      </Drawer>
    </Box>
  );
}
