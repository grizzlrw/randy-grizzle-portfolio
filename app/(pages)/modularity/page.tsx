"use client";

import { Box, Typography, Paper, Stack, TextField } from "@mui/material";
import PageLayout from "@/app/components/layouts/single-column/PageLayout";
import NavigationCard from "@/app/components/navigation/NavigationCard";
import { Code, Assignment, Feedback, BugReport } from "@mui/icons-material";

export default function ModularityPage() {
  return (
    <PageLayout title="Building Modular Component Systems" maxWidth={900}>
      <Typography component="p" sx={{ mb: 4, fontSize: "1.125rem", color: "text.secondary" }}>
        Modular design is about building systems where components work independently and compose predictably. 
        This article explores the principles and patterns that make component systems maintainable at scale, 
        with examples from this portfolio.
      </Typography>

      <Box component="section" sx={{ my: 5 }}>
        <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
          Single Responsibility Principle
        </Typography>

        <Typography component="p" sx={{ mb: 3 }}>
          Each component should have one clear job. The NavigationCard component renders a clickable card with 
          an icon, title, and description. It doesn&apos;t fetch data, manage routing logic, or handle authentication. 
          It receives props and renders markup. This constraint makes it reusable across contexts.
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <NavigationCard
            href="/about"
            title="About Me"
            description="Learn about my background and skills"
            icon={<Assignment />}
            headerComponentType="h3"
          />
          <NavigationCard
            href="/contact"
            title="Contact"
            description="Reach out to chat about tech or opportunities"
            icon={<Feedback />}
            headerComponentType="h3"
          />
          <NavigationCard
            href="/forms"
            title="Forms Dashboard"
            description="Explore the Dynamic Forms examples"
            icon={<BugReport />}
            headerComponentType="h3"
          />
        </Stack>

        <Typography component="p" sx={{ mb: 2, fontSize: "0.95rem", color: "text.secondary" }}>
          These cards appear on the forms dashboard, accessibility demo, and this page. Same component, 
          different content. Because they handle only presentation, they work anywhere.
        </Typography>
      </Box>

      <Box component="section" sx={{ my: 5 }}>
        <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
          Composition Over Configuration
        </Typography>

        <Typography component="p" sx={{ mb: 3 }}>
          Rather than building specialized components for every use case, build flexible primitives that 
          compose. A page layout component structures content. A grid component arranges children. A card 
          component displays information. Combine them differently to build different features.
        </Typography>

        <Stack spacing={1.5} sx={{ mb: 3 }}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Code color="primary" />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Home Page
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  PageLayout + Grid + SkillCard
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Code color="primary" />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Forms Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  PageLayout + Stack + NavigationCard
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Code color="primary" />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Contact Form
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  PageLayout + Stack + TextField + Button
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Stack>

        <Typography component="p" sx={{ mb: 2, fontSize: "0.95rem", color: "text.secondary" }}>
          Same building blocks, different outcomes. This approach is faster than building custom solutions 
          and more maintainable than duplicating code across pages.
        </Typography>
      </Box>

      <Box component="section" sx={{ my: 5 }}>
        <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
          Props as Explicit Dependencies
        </Typography>

        <Typography component="p" sx={{ mb: 3 }}>
          Components should receive everything they need through props. Avoid implicit dependencies on global 
          state, environment variables, or context when props suffice. This makes components portable and their 
          requirements explicit.
        </Typography>

        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2.5, 
            mb: 3, 
            bgcolor: "grey.50",
            fontFamily: "monospace",
            fontSize: "0.875rem",
          }}
        >
          <Typography component="pre" sx={{ m: 0, whiteSpace: "pre-wrap", fontSize: "inherit" }}>
{`<NavigationCard
  href="/accessibility"
  title="Accessibility"
  description="WCAG 2.1 compliance"
  icon={<CheckCircle />}
  headerComponentType="h3"
/>`}
          </Typography>
        </Paper>

        <Typography component="p" sx={{ mb: 2, fontSize: "0.95rem", color: "text.secondary" }}>
          Everything this component needs is visible at the call site. No hidden configuration, no magic 
          imports. Copy this component to a different codebase and it works immediately.
        </Typography>
      </Box>

      <Box component="section" sx={{ my: 5 }}>
        <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
          Defaults and Flexibility
        </Typography>

        <Typography component="p" sx={{ mb: 3 }}>
          Components should work with minimal configuration but expose customization when needed. Default 
          heading levels make most usage simple. Optional props handle edge cases. This pattern balances 
          convenience with control.
        </Typography>

        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2.5, 
            mb: 3, 
            bgcolor: "grey.50",
            fontFamily: "monospace",
            fontSize: "0.875rem",
          }}
        >
          <Typography component="pre" sx={{ m: 0, whiteSpace: "pre-wrap", fontSize: "inherit" }}>
{`// Simple usage with defaults
<NavigationCard 
  href="/about" 
  title="About" 
  description="Background" 
/>

// Custom heading level for nested context
<NavigationCard 
  href="/about" 
  title="About" 
  description="Background"
  headerComponentType="h4"
/>`}
          </Typography>
        </Paper>

        <Typography component="p" sx={{ mb: 2, fontSize: "0.95rem", color: "text.secondary" }}>
          Most usage stays simple. Edge cases get the flexibility they need without cluttering 
          the common path.
        </Typography>
      </Box>

      <Box component="section" sx={{ my: 5 }}>
        <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
          Practical Impact
        </Typography>

        <Typography component="p" sx={{ mb: 3 }}>
          Modularity trades upfront design time for long-term velocity. The investment in building focused, 
          composable components pays dividends across the development lifecycle.
        </Typography>

        <Stack spacing={3} sx={{ mb: 3 }}>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              Faster iteration
            </Typography>
            <Typography variant="body2" color="text.secondary">
              New pages compose existing components instead of building from scratch. The accessibility demo, 
              forms dashboard, and this page all reuse the same navigation cards, layouts, and form fields. 
              Each new page takes hours, not days.
            </Typography>
          </Box>

          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              Easier maintenance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              When NavigationCard gained improved ARIA labels, every instance across every page benefited. 
              One change, universal improvement. No hunting through duplicated implementations.
            </Typography>
          </Box>

          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              Consistent user experience
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cards behave the same way everywhere. Forms validate consistently. Layouts maintain uniform 
              spacing. Users learn patterns once and apply them across the entire application.
            </Typography>
          </Box>

          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              Reduced cognitive load
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Developers learn the component library and immediately become productive. They don&apos;t need 
              to understand the entire codebase to build features—just how to compose layouts, cards, 
              and form fields.
            </Typography>
          </Box>
        </Stack>

        <Typography component="p" sx={{ fontSize: "0.95rem", color: "text.secondary" }}>
          Well-designed component systems get easier to work with over time, not harder. Components stay 
          focused. Changes stay isolated. The codebase remains maintainable even as it grows.
        </Typography>
      </Box>
    </PageLayout>
  );
}
