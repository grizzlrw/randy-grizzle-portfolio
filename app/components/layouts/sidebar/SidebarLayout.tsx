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
    <Grid size={{ xs: 12, md: mainWidth }}>
      <Box component="main" id={"main-content"} sx={{ py: 2 }}>
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          sx={{ mb: 4 }}
        >
          {title}
        </Typography>
        {mainContent}
      </Box>
    </Grid>
  );

  const sidebarSection = (
    <Grid size={{ xs: 12, md: sidebarWidth }}>
      <Box component="aside" sx={{ py: 2 }}>
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
            alignItems: "center",
            py: 6,
            px: 2,
            "&:focus": {
              outline: "none",
            },
          }}
        >
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
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
