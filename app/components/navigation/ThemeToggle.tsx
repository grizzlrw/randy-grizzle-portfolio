"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Client-side only mounting check to prevent hydration mismatch
  // This is a standard pattern with next-themes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <IconButton
        sx={{ ml: 1 }}
        color="inherit"
        aria-label="Toggle theme"
        disabled
      >
        <Brightness7Icon />
      </IconButton>
    );
  }

  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`}>
      <IconButton
        onClick={toggleTheme}
        sx={{ ml: 1 }}
        color="inherit"
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
}
