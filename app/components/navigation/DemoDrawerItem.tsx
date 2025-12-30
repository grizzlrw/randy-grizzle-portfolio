"use client";

import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Link from "next/link";

export type Skill = {
  id: string;
  title: string;
  description: string;
  route: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type DemoDrawerItemProps = {
  /**
   * Array of skills to display in the collapsible list
   */
  skills: Skill[];
  /**
   * Callback when a skill item is clicked (for closing drawer on mobile)
   */
  onItemClick?: () => void;
  /**
   * ARIA label for the demo section
   * @default 'Demo navigation'
   */
  ariaLabel?: string;
};

/**
 * DemoDrawerItem - A collapsible list item for the mobile drawer menu
 * 
 * Features:
 * - Expandable/collapsible skill list
 * - Professional styling matching drawer aesthetic
 * - Keyboard navigation support
 * - Accessible ARIA labels
 * - Smooth expand/collapse animations
 */
export default function DemoDrawerItem({
  skills,
  onItemClick,
  ariaLabel = 'Demo navigation',
}: DemoDrawerItemProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSkillClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <List disablePadding sx={{ width: '100%' }}>
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleToggle}
          aria-label={ariaLabel}
          aria-expanded={open}
          sx={{
            textAlign: 'left',
            display: 'flex',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <ListItemText
            primary="Demo"
            slotProps={{
              primary: {
                fontWeight: 500,
              },
            }}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          disablePadding
          sx={{
            backgroundColor: 'action.hover',
          }}
        >
          {skills.length === 0 ? (
            <ListItem sx={{ pl: 4, mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                No demo areas available
              </Typography>
            </ListItem>
          ) : (
            skills.map((skill) => (
              <ListItem key={skill.id} disablePadding>
                <ListItemButton
                  component={Link}
                  href={skill.route}
                  onClick={handleSkillClick}
                  tabIndex={0}
                  sx={{
                    pl: 4,
                    py: 1.5,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    backgroundColor: 'background.paper',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: 'var(--primary-bg)',
                      borderLeft: '.25rem solid',
                      borderColor: 'primary.main',
                      //transform: 'translateX(.125rem)',
                    },
                    '&:focus-visible': {
                      zIndex: 1,
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.main',
                      mb: 0.5,
                    }}
                  >
                    {skill.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.3,
                    }}
                  >
                    {skill.description}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Collapse>
    </List>
  );
}
