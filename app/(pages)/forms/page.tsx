"use client";
import { Card, Stack, Typography, CardHeader, CardContent } from "@mui/material";
import { Assignment, Feedback, BugReport } from "@mui/icons-material";
import NextLink from "next/link";
import {
  CardActionArea,
} from "@mui/material";
import PageLayout from "@/app/components/layouts/single-column/PageLayout";

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
        <PageLayout title="Forms Page" maxWidth={960}>
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
                            transition: "box-shadow 300ms ease, transform 300ms ease, border-color 300ms ease",
                            borderLeft: '4px solid',
                            borderLeftColor: 'primary.main',
                            "&:hover": {
                              boxShadow: '0 8px 24px rgba(3, 76, 140, 0.15)',
                              transform: "translateY(-4px) scale(1.02)",
                              borderLeftColor: 'primary.700',
                            },
                            "&:focus-within": {
                              boxShadow: '0 8px 24px rgba(3, 76, 140, 0.15)',
                              transform: "translateY(-4px) scale(1.02)",
                              borderLeftColor: 'primary.700',
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
                              backgroundColor: "transparent",
                              "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                              },
                              "&:focus": {
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                              },
                              "&:focus-visible": {
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
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
        </PageLayout>
    );
}