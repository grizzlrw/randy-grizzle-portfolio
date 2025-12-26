import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";
import AppBarClient from "./components/navigation/app-bar-client";
import SkipLink from "./components/navigation/SkipLink";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Providers from './providers';
import LiveAnnouncerWrapper from "./components/LiveAnnouncerWrapper";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Randy Grizzle Portfolio",
  description: "Portfolio of Randy Grizzle's skills as a Senior Frontend Developer and Digital Accessibility Specialist.",
  icons: {
    icon: "/GrizzleLogo.svg",
  },
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>      
      <body
        className={`${nunitoSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LiveAnnouncerWrapper>
          <AppRouterCacheProvider>
            <Providers>
              {/* <SkipLink href="#main-content">Skip to main content</SkipLink>
              <AppBarClient /> */}
              {children}
              <Analytics />
            </Providers>   
          </AppRouterCacheProvider>
        </LiveAnnouncerWrapper>
      </body>
    </html>
  );
}
