"use client";

import { Box, Typography, Paper, Stack, TextField, Button } from "@mui/material";
import PageLayout from "@/app/components/layouts/single-column/PageLayout";
import NavigationCard from "@/app/components/navigation/NavigationCard";
import { useState } from "react";
import { CheckCircle, Code, Settings, Assignment, Feedback, BugReport } from "@mui/icons-material";

export default function ModularityPage() {
  const [inputValue, setInputValue] = useState("");

  return (
    <PageLayout title="Modularity & Reusability" maxWidth={1100}>
      <Typography component="p" sx={{ mb: 3 }}>
        Good components don&apos;t just work in one place. They work everywhere. This page demonstrates how 
        the same components used throughout this portfolio can be dropped into new contexts without modification.
      </Typography>

      <Typography component="p" sx={{ mb: 3 }}>
        Each component below is pulled directly from the codebase. No special versions, no customization for 
        this page. They just work.
      </Typography>

      <Box component="section" sx={{ my: 5 }}>
        <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
          Clickable Navigation Cards
        </Typography>

        <Typography component="p" sx={{ mb: 3 }}>
          These cards appear on the forms dashboard, the accessibility demo page, and now here. Same underlying 
          code, different content. Each one displays a title, description, icon, and makes the entire surface clickable. 
          The code doesn&apos;t know about forms, authentication, or routing logic. It just renders what you give it.
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
          <NavigationCard
            href="/about"
            title="About Me"
            description="Learn more about my background and skills"
            icon={<Assignment />}
            headerComponentType="h3"
          />
          <NavigationCard
            href="/contact"
            title="Contact Me"
            description="Reach out to me to talk shop or discuss opportunities"
            icon={<Feedback />}
            headerComponentType="h3"
          />
          <NavigationCard
            href="/forms"
            title="Forms Dashboard"
            description="Head to the Forms Dashboard to see the dynamic form system in action"
            icon={<BugReport />}
            headerComponentType="h3"
          />
        </Stack>

        <Paper variant="outlined" sx={{ p: 3, mb: 3, bgcolor: "grey.50" }}>
          <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
            What makes this reusable?
          </Typography>

          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <CheckCircle color="success" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="body2">
                  <strong>Single responsibility:</strong> Renders a clickable card. Doesn&apos;t fetch 
                  data, manage state, or handle business logic.
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="flex-start">
              <CheckCircle color="success" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="body2">
                  <strong>Props-based configuration:</strong> Everything it needs comes through props. No global 
                  dependencies, no environment variables, no hidden magic.
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="flex-start">
              <CheckCircle color="success" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="body2">
                  <strong>Accessibility built in:</strong> ARIA labels, semantic HTML, keyboard navigation, 
                  entire surface clickable. Works correctly by default.
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Paper>

        <Typography component="p" sx={{ mb: 2 }}>
          This pattern repeats throughout the portfolio. Each piece has one job and accepts configuration 
          through props. Error boundaries wrap content. Layouts structure pages. Cards display information.
        </Typography>
      </Box>

      <Box component="section" sx={{ my: 5 }}>
        <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
          Form Fields
        </Typography>

        <Typography component="p" sx={{ mb: 3 }}>
          The dynamic form system uses reusable fields. Each type handles its own rendering, 
          validation feedback, and accessibility. Drop them anywhere you need input.
        </Typography>

        <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
          <Stack spacing={3}>
            <TextField
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              helperText="Standard MUI TextField used throughout forms"
              fullWidth
            />

            <TextField
              label="Your Message"
              multiline
              rows={4}
              placeholder="Tell me about your project..."
              helperText="Same component, different configuration"
              fullWidth
            />

            <Stack direction="row" spacing={2}>
              <TextField
                label="First Name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                fullWidth
              />
              <TextField
                label="Last Name"
                fullWidth
              />
            </Stack>
          </Stack>
        </Paper>

        <Typography component="p" sx={{ mb: 2 }}>
          These aren&apos;t custom-built for this page. They&apos;re the same fields used in the contact form, 
          the dynamic forms page, and throughout the site. Consistent behavior, consistent styling, 
          consistent accessibility.
        </Typography>
      </Box>

      <Box component="section" sx={{ my: 5 }}>
        <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
          Building for Composition
        </Typography>

        <Typography component="p" sx={{ mb: 3 }}>
          Instead of building specialized variants for every use case, I build flexible pieces that combine 
          in different ways. Layouts structure pages. Grids arrange content. Cards display information. Mix 
          them differently for different outcomes.
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
                  Page layout + grid + skill cards
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
                  Page layout + stack + clickable cards
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
                  Page layout + stack + text fields + button
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Stack>

        <Typography component="p" sx={{ mb: 2 }}>
          Same building blocks, different combinations. The page layout appears everywhere but the content changes. 
          This is faster than building custom solutions, more maintainable than copy-pasting code, and more 
          consistent than letting each page solve problems independently.
        </Typography>
      </Box>

      <Box component="section" sx={{ my: 5 }}>
        <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
          Props Over Configuration Files
        </Typography>

        <Typography component="p" sx={{ mb: 3 }}>
          Components configure through props, not global settings. This keeps them portable. Copy a component 
          to a different project and it works immediately because everything it needs is explicit.
        </Typography>

        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            mb: 3, 
            bgcolor: "background.default",
            fontFamily: "monospace",
            fontSize: "0.875rem",
          }}
        >
          <Typography component="pre" sx={{ m: 0, whiteSpace: "pre-wrap", fontSize: "inherit" }}>
{`<Card
  id="example"
  title="Accessibility"
  description="WCAG 2.1 compliance"
  route="/accessibility"
  headerLevel="h3"
/>`}
          </Typography>
        </Paper>

        <Typography component="p" sx={{ mb: 2 }}>
          Everything needed is right there. No hidden dependencies on global state, theme settings, 
          or environment variables. You can read the code and understand exactly what&apos;s happening.
        </Typography>
      </Box>

      <Box component="section" sx={{ my: 5 }}>
        <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
          Sensible Defaults
        </Typography>

        <Typography component="p" sx={{ mb: 3 }}>
          Good code works with minimal configuration but exposes customization when needed. Cards default 
          to one heading level, but you can change it for nested contexts. Text fields have standard styling but accept 
          custom properties. Page layouts have default spacing but let you adjust.
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Paper variant="outlined" sx={{ p: 2, flex: 1 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Settings color="primary" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Minimal Config
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Works out of the box with sensible defaults
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2, flex: 1 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Settings color="primary" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Full Control
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Every meaningful customization exposed as props
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Stack>

        <Typography component="p" sx={{ mb: 2 }}>
          This balance means you only configure what differs from the default. Most usage is simple. 
          Edge cases get the control they need.
        </Typography>
      </Box>

      <Box component="section" sx={{ my: 5 }}>
        <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
          Built-in Accessibility Testing
        </Typography>

        <Typography component="p" sx={{ mb: 3 }}>
          Reusable components get tested once and work correctly everywhere. Every component in this portfolio 
          includes comprehensive accessibility validation that runs automatically with the test suite.
        </Typography>

        <Paper variant="outlined" sx={{ p: 3, mb: 3, bgcolor: "grey.50" }}>
          <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
            What gets tested
          </Typography>

          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <CheckCircle color="success" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="body2">
                  <strong>WCAG 2.1 Level AA compliance:</strong> Automated checks for color contrast, proper 
                  ARIA usage, semantic HTML, keyboard navigation, and focus management.
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="flex-start">
              <CheckCircle color="success" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="body2">
                  <strong>Screen reader compatibility:</strong> Every interactive element has proper labels, 
                  descriptions, and roles. Form fields announce errors. Buttons describe their actions.
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="flex-start">
              <CheckCircle color="success" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="body2">
                  <strong>Keyboard navigation:</strong> All interactive elements are reachable and operable 
                  via keyboard. Focus order is logical. Focus indicators are visible and meet contrast requirements.
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="flex-start">
              <CheckCircle color="success" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="body2">
                  <strong>Best practice validation:</strong> Component structure, heading hierarchy, landmark 
                  regions, and form associations all checked automatically.
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Paper>

        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            mb: 3, 
            bgcolor: "background.default",
            fontFamily: "monospace",
            fontSize: "0.875rem",
          }}
        >
          <Typography component="pre" sx={{ m: 0, whiteSpace: "pre-wrap", fontSize: "inherit" }}>
{`test("Card has no accessibility violations", async () => {
  const { container } = render(
    <Card
      id="skill-1"
      title="Accessibility"
      description="WCAG 2.1 compliance"
      route="/accessibility"
    />
  );
  
  const results = await axe(container, {
    runOnly: {
      type: 'tag',
      values: [
        'wcag2a', 'wcag2aa',
        'wcag21a', 'wcag21aa',
        'best-practice',
        'cat.aria',
        'cat.keyboard',
        'cat.name-role-value'
      ]
    }
  });
  
  expect(results).toHaveNoViolations();
});`}
          </Typography>
        </Paper>

        <Typography component="p" sx={{ mb: 2 }}>
          This test runs against every reusable component. Cards, form fields, navigation elements, layouts. 
          If accessibility regresses, the build fails. No exceptions, no manual checking required.
        </Typography>
      </Box>

      <Box component="section" sx={{ my: 5 }}>
        <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
          Real Impact
        </Typography>

        <Typography component="p" sx={{ mb: 3 }}>
          Modularity isn&apos;t about clean code for its own sake. It&apos;s about velocity and maintenance.
        </Typography>

        <Typography component="p" sx={{ mb: 3 }}>
          When I added aria-describedby to navigation cards, every card on every page got better accessibility. 
          One change, universal improvement. No hunting through duplicate implementations.
        </Typography>

        <Typography component="p" sx={{ mb: 3 }}>
          When building new pages, I compose existing components instead of writing new code. The testing page 
          used page layouts. The accessibility demo used skill cards. This page uses both. Each new page is hours 
          of work instead of days.
        </Typography>

        <Typography component="p" sx={{ mb: 2 }}>
          When onboarding developers, they learn the component library and immediately become productive. They 
          don&apos;t need to understand the entire codebase. They understand layouts, grids, cards, and 
          how to compose them.
        </Typography>

        <Typography component="p" sx={{ mb: 2 }}>
          Good modularity makes codebases easier to change over time, not harder. Components stay focused. 
          Changes stay isolated. The system stays maintainable.
        </Typography>
      </Box>
    </PageLayout>
  );
}
