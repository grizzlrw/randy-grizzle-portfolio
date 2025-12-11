import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export type PageLayoutProps = {
  children: ReactNode;
  /**
   * Maximum width of the content area in pixels
   * @default 1200
   */
  maxWidth?: number;
  /**
   * Optional page title to render as h1
   */
  title?: string;
  /**
   * Additional subtitle or description below the title
   */
  subtitle?: string;
  /**
   * Vertical padding in theme spacing units
   * @default 4
   */
  py?: number;
  /**
   * Horizontal padding in theme spacing units
   * @default 2
   */
  px?: number;
  /**
   * Component to use for the main wrapper
   * @default "main"
   */
  component?: React.ElementType;
};

/**
 * PageLayout provides a consistent container and spacing pattern
 * for content pages, eliminating duplicated layout boilerplate.
 * 
 * Features:
 * - Consistent max-width and centering
 * - Optional h1 title rendering
 * - Configurable padding and dimensions
 * - Semantic main element by default
 * 
 * @example
 * ```tsx
 * <PageLayout title="About Me" maxWidth={960}>
 *   <Typography>Your content here</Typography>
 * </PageLayout>
 * ```
 */
export default function PageLayout({
  children,
  maxWidth = 1200,
  title,
  subtitle,
  py = 4,
  px = 2,
  component = "main",
}: PageLayoutProps) {
  return (
    <Box
      component={component}
      id="main-content"
      tabIndex={-1}
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 12,
        pb: 4,
        px,
        "&:focus": {
          outline: "none",
        },
      }}
    >
      <Box
        component="section"
        sx={{
          width: "100%",
          maxWidth,
          mx: "auto",
        }}
      >
        {title && (
          <Box sx={{ mb: subtitle ? 1 : 4 }}>
            <Typography component="h1" variant="h4" sx={{ mb: subtitle ? 1 : 0 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography component="p" variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        {children}
      </Box>
    </Box>
  );
}
