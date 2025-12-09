"use client";
import { useState } from "react";
import { Box, Card, Stack, Typography, CardHeader, CardContent } from "@mui/material";
import { Assignment, Feedback, BugReport } from "@mui/icons-material";
import NextLink from "next/link";
import {
  CardActionArea,
} from "@mui/material";

export function handleSubmit(event: React.FormEvent<HTMLFormElement>) { 
    event.preventDefault();
    // No network calls here; this is a pure demo form
}

const formLinks = [
    { label: "Application Form", href: "/forms/dynamic-application", icon: <Assignment /> },
    { label: "Feedback Form", href: "/forms/feedback", icon: <Feedback /> },
    { label: "Bug Report", href: "/forms/bug-report", icon: <BugReport /> },
];

export default function Page() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-between py-16 bg-white dark:bg-black sm:items-start">
            <Box component="section" sx={{ width: "100%", maxWidth: 960, mx: "auto", py: 2, px: 2 }}>
                <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
                    Forms Page
                </Typography>

                <Typography component="p" sx={{ mb: 4 }}>
                    Welcome to the Forms Dashboard.  Dynamic forms are a powerful tool for handling a wide variety of data collection efforts while reducing front end maintentence overhead.  Feel free to explore a few examples of dynamically generated forms by using the buttons below, or the drawer to the left.
                </Typography>   

                <Stack spacing={3} direction="row">
                    {formLinks.map((link) => (
                        <Card
                          key={link.href}
                          component="article"
                          variant="outlined"
                          sx={{
                            mt: 4,
                            transition: "box-shadow 150ms ease, transform 150ms ease",
                            backgroundColor: "background.paper",
                            "&:hover": {
                              backgroundColor: "background.paper",
                              boxShadow: 4,
                              transform: "translateY(-2px)",
                            },
                            "&:focus-within": {
                              backgroundColor: "background.paper",
                              boxShadow: 4,
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          <CardActionArea
                            component={NextLink}
                            href={link.href}
                            aria-label={link.label}  // using the same label for the card-link as the title
                            aria-describedby={`description-for-${link.href.replace("/", "_")}`} // detailed description
                            sx={{
                              display: "block",
                              textAlign: "left",
                              backgroundColor: "background.paper",
                              "&:hover": {
                                backgroundColor: "background.paper",
                              },
                              "&:focus-visible": {
                                outline: "2px solid",
                                outlineColor: "primary.main",
                                outlineOffset: 4,
                              },
                            }}
                          >
                            <CardHeader
                              component="header"
                              avatar={link.icon}
                              titleTypographyProps={{ component: "h2", variant: "h6" }}
                              title={link.label}
                            />
                            <CardContent>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                id={`description-for-${link.href.replace("/", "_")}`}
                                // Note: This description is not part of the link label for accessibility.
                                // assistive tech will still reach this after the link, but
                                // it won't all be used as the *link label*
                              >
                                This is a placeholder for the {link.label}. Navigate to this page
                                to see the full form implementation.
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      ))}
                </Stack>
            </Box>
        </main>
    );
}