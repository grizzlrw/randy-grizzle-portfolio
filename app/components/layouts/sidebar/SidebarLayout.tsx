import { ReactNode, Children, isValidElement } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type MainProps = {
  children: ReactNode;
};

type SidebarProps = {
  children: ReactNode;
};

type SidebarLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  sidebarPosition?: "left" | "right";
  mainWidth?: number;
  sidebarWidth?: number;
};

/**
 * Main content area component
 */
function Main({ children }: MainProps) {
  return <>{children}</>;
}

/**
 * Sidebar content area component
 */
function Sidebar({ children }: SidebarProps) {
  return <>{children}</>;
}

/**
 * Sidebar Layout Component
 * 
 * A flexible layout that displays content in a main area and sidebar using MUI Grid.
 * Uses compound components for a clean, intuitive API.
 * 
 * @example
 * ```tsx
 * <SidebarLayout title="Page Title">
 *   <SidebarLayout.Main>
 *     Main content here...
 *   </SidebarLayout.Main>
 *   <SidebarLayout.Sidebar>
 *     Sidebar content here...
 *   </SidebarLayout.Sidebar>
 * </SidebarLayout>
 * ```
 */
function SidebarLayout({
  title,
  subtitle,
  children,
  sidebarPosition = "right",
  mainWidth = 8,
  sidebarWidth = 4,
}: SidebarLayoutProps) {
  let mainContent: ReactNode = null;
  let sidebarContent: ReactNode = null;

  // Extract Main and Sidebar children
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const element = child as React.ReactElement<{ children: ReactNode }>;
      if (element.type === Main) {
        mainContent = element.props.children;
      } else if (element.type === Sidebar) {
        sidebarContent = element.props.children;
      }
    }
  });

  const mainSection = (
    <Grid size={{ xs: 12, md: mainWidth }} sx={{ px: 0 }}>
      <Box component="main" id={"main-content"}>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h1"
            variant="h4"
          >
            {title}
          </Typography>
          <Typography 
            component="p" 
            variant="subtitle1" 
            sx={{ mb: 2, display: 'block', color: 'text.secondary', fontSize: '1.25rem' }}
          >
            {subtitle}
          </Typography>
        </Box>
        {mainContent}
      </Box>
    </Grid>
  );

  const sidebarSection = (
    <Grid size={{ xs: 12, md: sidebarWidth, }}>
      <Box component="aside" sx={{ backgroundColor: 'primary.50', minHeight: '100vh'}}>
        {sidebarContent}
      </Box>
    </Grid>
  );

  return (
    
    <Box
          id="main-content"
          tabIndex={-1}
          sx={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            py: 8,
            px: 0,
            "&:focus": {
              outline: "none",
            },
          }}
        >
    <Container maxWidth={false} disableGutters sx={{ px: 0 }}>
      <Grid container spacing={0} sx={{ px: 0 }}>
        {sidebarPosition === "left" && sidebarSection}
        {sidebarPosition === "left" && mainSection}
        {sidebarPosition === "right" && mainSection}
        {sidebarPosition === "right" && sidebarSection}
      </Grid>
    </Container>
    </Box>
  );
}

// Attach sub-components
SidebarLayout.Main = Main;
SidebarLayout.Sidebar = Sidebar;

export default SidebarLayout;
