'use client';
import { Card, CardActionArea, CardHeader, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

export type NavigationCardProps = {
  /**
   * The URL to navigate to when the card is clicked
   */
  href: string;
  /**
   * The main title/label for the card
   */
  title: string;
  /**
   * Optional description text for the card
   */
  description?: string;
  /**
   * Optional icon to display in the card header
   */
  icon?: ReactNode;
  /**
   * Heading component type for the title
   * @default "h3"
   */
  headerComponentType?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Optional aria-label override (defaults to title)
   */
  ariaLabel?: string;
};

/**
 * NavigationCard - A consistent, accessible card component for navigation
 * 
 * Features:
 * - Entire card surface is clickable via CardActionArea
 * - Left border accent in primary color
 * - Smooth hover and focus-within effects
 * - Proper ARIA attributes for screen readers
 * - Semantic HTML structure
 */
export default function NavigationCard({
  href,
  title,
  description,
  icon,
  headerComponentType = "h3",
}: NavigationCardProps) {
  const descriptionId = description ? `description-for-${href.replace(/\//g, "_")}` : undefined;

  return (
    <Card
      component="article"
      variant="outlined"
      sx={{
        transition: "box-shadow 300ms ease, transform 300ms ease, border-color 300ms ease",
        borderLeft: '4px solid',
        borderLeftColor: 'primary.main',
        bgcolor: "background.paper",
        "&:hover": {
          boxShadow: '0 8px 24px rgba(3, 76, 140, 0.15)',
          transform: "translateY(-4px)",
          borderLeftColor: 'primary.dark',
        },
        "&:focus-within": {
          boxShadow: '0 8px 24px rgba(3, 76, 140, 0.15)',
          transform: "translateY(-4px)",
          borderLeftColor: 'primary.dark',
        },
      }}
    >
      <CardActionArea
        component={Link}
        href={href}
        aria-label={title} // Link ARIA Label supplied from title
        aria-describedby={descriptionId}
        sx={{
          display: "block",
          textAlign: "left",
          bgcolor: "transparent",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.02)",
          },
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "primary.main",
            outlineOffset: 4,
            backgroundColor: "rgba(0, 0, 0, 0.02)",
          },
        }}
      >
        <CardHeader
          avatar={icon}
          slotProps={{ title: { component: headerComponentType, variant: "h6" } }}
          title={title} // Card Header text supplied from title
        />
        {description && (
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              id={descriptionId}
            >
              {description}
            </Typography>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
}
