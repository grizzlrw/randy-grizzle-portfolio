// app/providers.tsx (for App Router)
'use client'; // Required for client-side functionality

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from './theme';
import { useMemo } from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <MuiThemeWrapper>{children}</MuiThemeWrapper>
      </NextThemeProvider>
    </AppRouterCacheProvider>
  );
};

const MuiThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();

  const theme = useMemo(
    () => getTheme(resolvedTheme === 'dark' ? 'dark' : 'light'),
    [resolvedTheme]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default Providers;