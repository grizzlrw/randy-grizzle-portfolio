// app/(pages)/forms/layout.tsx
import ClippedDrawer from "@/app/components/clipped-drawer/clipped-drawer";
import BugReport from '@mui/icons-material/BugReport';
import Feedback from '@mui/icons-material/Feedback';
import Assignment from '@mui/icons-material/Assignment';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Dashboard from '@mui/icons-material/Dashboard';
import { Box } from "@mui/material";

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    { label: "Forms Dashboard", href: "/forms", icon: <Dashboard /> },
    { label: "Divider", href:"" },
    { label: "Application Form", href: "/forms/dynamic-application", icon: <Assignment /> },
    { label: "Feedback Form", href: "/forms/feedback", icon: <Feedback /> },
    { label: "Bug Report", href: "/forms/bug-report", icon: <BugReport /> },
    { label: "Divider", href:"" },
    { label: "Go Back Home", href: "/", icon: <ArrowBack /> },
    // later: fetch from DB
  ];

  // <Divider></Divider>
  //         <ListItem disablePadding>
  //             <ListItemButton component={Link} href={"/"}>
  //               <ListItemIcon>
  //                 <Home />
  //               </ListItemIcon>
  //               <ListItemText primary={"Home"} />
  //             </ListItemButton>
  //           </ListItem>

  return (
    <div className="flex min-h-screen">
      <ClippedDrawer links={links} />
      <Box
        component="article"
        tabIndex={-1}
        sx={{
          flexGrow: 1,
          width: '100%',
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        {children}
      </Box>
    </div>
  );
}