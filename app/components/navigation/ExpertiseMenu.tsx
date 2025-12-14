"use client";

import { useState, MouseEvent } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Link from "next/link";

export type Skill = {
  id: string;
  title: string;
  description: string;
  route: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type ExpertiseMenuProps = {
  /**
   * Array of skills to display in the dropdown menu
   */
  skills: Skill[];
  /**
   * Button color when not hovered
   * @default '#000'
   */
  buttonColor?: string;
  /**
   * ARIA label for the menu button
   * @default 'Expertise menu'
   */
  ariaLabel?: string;
};

/**
 * ExpertiseMenu - A stylistic dropdown menu for navigating to skill/expertise pages
 * 
 * Features:
 * - Custom styled menu items with hover effects
 * - Skill titles and descriptions
 * - Keyboard navigation support
 * - Accessible ARIA labels
 * - Smooth transitions and professional styling
 */
export default function ExpertiseMenu({ 
  skills, 
  buttonColor = '#000',
  ariaLabel = 'Expertise menu'
}: ExpertiseMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
      // Return focus to the button
      const button = document.getElementById('expertise-button');
      if (button) {
        button.focus();
      }
    }
  };

  return (
    <>
      <Button
        id="expertise-button"
        aria-label={ariaLabel}
        aria-controls={open ? 'expertise-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: buttonColor,
          textTransform: 'none',
          fontSize: '0.875rem',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        Expertise
      </Button>
      <Popover
        id="expertise-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            elevation: 3,
            onKeyDown: handleKeyDown,
            role: 'dialog',
            'aria-label': 'Expertise navigation menu',
            sx: {
              minWidth: 320,
              maxWidth: 400,
              mt: 1,
              borderRadius: 2,
            },
          },
        }}
      >
        <Box
          role="menu"
          aria-labelledby="expertise-button"
          sx={{ p: 1 }}
        >
        {skills.length === 0 ? (
          <Box 
            role="menuitem" 
            aria-disabled="true"
            sx={{ px: 2, py: 1.5 }}
          >
            <Typography variant="body2" color="text.secondary">
              No expertise areas available
            </Typography>
          </Box>
        ) : (
          skills.map((skill) => (
            <Link
              key={skill.id}
              href={skill.route}
              onClick={handleClose}
              role="link"
              aria-label={skill.title}
              aria-describedby={`expertise-desc-${skill.id}`}
              tabIndex={0}
              autoFocus
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                padding: '12px 16px',
                borderRadius: '8px',
                margin: '4px 8px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(25, 118, 210, 0.08)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '2px solid rgb(25, 118, 210)';
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
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
                variant="body2"
                id={`expertise-desc-${skill.id}`}
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.813rem',
                  lineHeight: 1.4,
                }}
              >
                {skill.description}
              </Typography>
            </Link>
          ))
        )}
        </Box>
      </Popover>
    </>
  );
}
