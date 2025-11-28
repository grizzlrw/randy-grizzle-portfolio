"use client";
import DrawerAppBar from "./drawer-app-bar";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/app/theme";

export default function AppBarClient() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DrawerAppBar />
    </ThemeProvider>
  );
}