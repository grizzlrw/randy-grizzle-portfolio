"use client";
import { Stack, Typography } from "@mui/material";
import { Assignment, Feedback, BugReport } from "@mui/icons-material";
import PageLayout from "@/app/components/layouts/single-column/PageLayout";
import NavigationCard from "@/app/components/navigation/NavigationCard";

export function handleSubmit(event: React.FormEvent<HTMLFormElement>) { 
    event.preventDefault();
    // No network calls here; this is a pure demo form
}

const formLinks = [
    { 
        label: "Application Form", 
        href: "/forms/dynamic-application", 
        icon: <Assignment />,
        description: "This is a placeholder for the Application Form. Navigate to this page to see the full form implementation."
    },
    { 
        label: "Feedback Form", 
        href: "/forms/feedback", 
        icon: <Feedback />,
        description: "This is a placeholder for the Feedback Form. Navigate to this page to see the full form implementation."
    },
    { 
        label: "Bug Report", 
        href: "/forms/bug-report", 
        icon: <BugReport />,
        description: "This is a placeholder for the Bug Report. Navigate to this page to see the full form implementation."
    },
];

export default function Page() {
    return (
        <PageLayout title="Forms Page" maxWidth={960}>
                <Typography component="p" sx={{ mb: 4 }}>
                    Welcome to the Forms Dashboard.  Dynamic forms are a powerful tool for handling a wide variety of data collection efforts while reducing front end maintentence overhead.  Feel free to explore a few examples of dynamically generated forms by using the buttons below, or the drawer to the left.
                </Typography>   

                <Stack spacing={3} direction="row">
                    {formLinks.map((link) => (
                        <NavigationCard
                            key={link.href}
                            href={link.href}
                            title={link.label}
                            description={link.description}
                            icon={link.icon}
                            headerComponentType="h2"
                        />
                      ))}
                </Stack>
        </PageLayout>
    );
}