"use client";

import { Box, Typography, Stack, List, ListItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import PageLayout from "@/app/components/layouts/PageLayout";

// Languages:
// JavaScript (ES6+) · TypeScript · HTML/CSS/SCSS
// Technologies:
// Vue 3 · React · Angular · Next.js · Node.js Tailwind · Material UI · Bootstrap Jest · React Testing Library · Axe GraphQL · PostgreSQL/Supabase
// Specializations:
// Design Systems & Component Library Development Accessibility (WCAG 2.1 AA · Section 508 · ARIA) Accessibility Testing (Axe · JAWS · NVDA) i18n Architecture & Translation Workflows
// Other: REST API Integration · API Design State Management (Vuex · Redux) CI/CD (Git workflows · Octopus Deploy) Data Visualization (Chart.JS)
export default function AboutPage() {

const aboutSkills = {
  languages: [
    "JavaScript (ES6+)",
    "TypeScript",
    "HTML/CSS/SCSS",
  ],
  technologies: [
    "Vue 3",
    "React",
    "Angular",
    "Next.js",
    "Node.js",
    "Tailwind",
    "Material UI",
    "Bootstrap",
    "Jest",
    "React Testing Library",
    "Axe",
    "GraphQL",
    "PostgreSQL/Supabase",
  ],
  specializations: [
    "Design Systems & Component Library Development",
    "Accessibility (WCAG 2.1 AA, Section 508, ARIA)",
    "Accessibility Testing (Axe, JAWS, NVDA)",
    "i18n Architecture & Translation Workflows",
  ],
  other: [
    "REST API Integration",
    "API Design",
    "State Management (Vuex · Redux)",
    "CI/CD (Git workflows · Octopus Deploy)",
    "Data Visualization (Chart.JS)",
  ],
};


  return (
    <PageLayout title="About Me" maxWidth={1200}>
    <Grid container spacing={2}>
        
        <Grid size={{ xs: 12, sm: 12, md: 8 }}>
            <Item>
                    <Box>

                        <Typography component="p" sx={{ mb: 4, mt: 1 }}>
                        I&apos;m a Senior Frontend Developer with more than a decade of experience building 
                        applications that make complex information usable, approachable, and genuinely helpful 
                        to the people who rely on it. For much of my career, that&apos;s meant working in public 
                        health—supporting community health workers, clinicians, and researchers by developing 
                        tools that bring together scattered data, streamline decision-making, and improve access 
                        to evidence-based information.
                        </Typography>

                        <Typography component="p" sx={{ mb: 4, mt: 1 }}>
                        My work in this public health has shaped a lot of how I approach engineering: thoughtful collaboration, 
                        clear communication, and building interfaces that hold up under real-world use. I&apos;ve spent years 
                        developing applications handling sensitive client data, aligning with federal accessibility standards, and 
                        shipping software that people depend on in high-stakes environments. It&apos;s where I learned to build
                        well-structured UIs, reliable component libraries, and accessible design patterns.
                        </Typography>

                        <Typography component="p" sx={{ mb: 4, mt: 1 }}>
                        Accessibility has become one of the areas I&apos;m most invested in professionally. I&apos;ve 
                        engineered applications to meet WCAG 2.1 AA and Section 508, implemented ARIA-driven 
                        patterns for dynamic components, performed manual audits with JAWS and NVDA, and collaborated 
                        with external evaluators to obtain “fully or partially supported” VPAT ratings.
                        More importantly, I think about accessibility as fundamental architecture—not an afterthought. 
                        It influences every decision I make, from design discussions to data modeling to component structure.
                        </Typography>

                        <Typography component="p" sx={{ mb: 4, mt: 1 }}>
                        I work across modern front‑end stacks and API patterns, including React, Vue, Angular, REST APIs, 
                        and GraphQL. I enjoy collaborating closely with UX teams to build illustrative, expressive UI concepts 
                        that bring design and engineering together. Whether it&apos;s a dynamic chart, 
                        a custom SVG renderer, or an interface that teaches the user something as they interact with it, 
                        I&apos;m drawn to work that blends interaction, clarity, and visual storytelling.
                        </Typography>

                        <Typography component="p" sx={{ mb: 4, mt: 1 }}>
                        While public health has been the throughline of my career, I&apos;m not confined to that domain. 
                        The problems I&apos;m best at solving—accessibility challenges, complex data flows, dynamic forms, 
                        component systems, and clear communication between teams—show up across industries. I&apos;m looking 
                        for opportunities where I can apply my experience in a fresh context, collaborate with thoughtful 
                        people, and build applications that are both technically strong and genuinely enjoyable to use.
                        </Typography>

                        <Typography component="p" sx={{ mb: 4, mt: 1 }}>
                        If you&apos;re interested in working together—or if you just want to compare approaches to UI 
                        architecture, accessibility, or design systems—I&apos;d love to chat.
                        </Typography>

                        {/* Add your about content here: timeline, highlights, philosophy, etc. */}
                    </Box>
            </Item>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <Item component={"aside"} sx={{ pt: 4, px: 2 }}>
                <Box>
                    {Object.entries(aboutSkills).map(([category, skills]) => (
                        <Box key={category} sx={{ mb: 2 }}>
                            <Box sx={{ backgroundColor: 'primary.main', transform: 'skew(-30deg)', mb: 1, px: 2, py: 0.5 }}>
                                <Typography variant="h6" component="h3" sx={{ transform: 'skew(30deg)', color: 'background.paper' }}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </Typography>
                            </Box>
                            
                            <List>
                                {skills.map((skill) => (
                                <ListItem key={skill} disablePadding sx={{ ml: 2 }}>
                                    {skill}
                                </ListItem>
                                // <Chip key={skill} label={skill} />
                            ))}
                            </List>
                            <Stack direction="column" spacing={1} flexWrap="wrap">
                            
                            </Stack>
                        </Box>
                        ))}
                </Box>
                
            </Item>
        </Grid>
        
    </Grid>
    </PageLayout>
  );


}
