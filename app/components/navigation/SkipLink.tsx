"use client";

import { Box } from "@mui/material";

type SkipLinkProps = {
  href: string;
  children: React.ReactNode;
};

/**
 * Skip Link Component
 * 
 * Provides a visually hidden link that becomes visible on keyboard focus,
 * allowing users to skip repetitive navigation and jump directly to main content.
 * 
 * Accessibility features:
 * - Positioned off-screen until focused
 * - High contrast focus styles
 * - Smooth scroll behavior when activated
 * - Programmatically moves focus to target element
 */
export default function SkipLink({ href, children }: SkipLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Remove the # from href to get the element ID
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Scroll to the element
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Move focus to the element
      targetElement.focus();
    }
  };

  return (
    <Box
      component="a"
      href={href}
      onClick={handleClick}
      sx={{
        position: "absolute",
        left: "-9999px",
        top: "auto",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        zIndex: 9999,
        "&:focus": {
          position: "fixed",
          top: 4,
          left: 4,
          width: "auto",
          height: "auto",
          padding: 2,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          textDecoration: "none",
          borderRadius: 1,
          boxShadow: 3,
          outline: "3px solid",
          outlineColor: "primary.dark",
          outlineOffset: 2,
          fontWeight: 600,
          fontSize: "1rem",
        },
      }}
    >
      {children}
    </Box>
  );
}
