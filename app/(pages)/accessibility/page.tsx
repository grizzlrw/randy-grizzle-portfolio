"use client";
import Link from "next/link";
import {
  Box,
  Typography,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemText,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  ListItemIcon,
  Paper,
  Code,
} from "@mui/material";
import { Assignment, Check } from "@mui/icons-material";
import { CardActionArea } from "@mui/material";
import { useForm } from "react-hook-form";
import SkipLink from "@/app/components/navigation/SkipLink";

function SkipLinkDemo() {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        position: "relative",
        minHeight: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SkipLink href="#skip-demo-target">Skip to demo content</SkipLink>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Typography variant="body2" color="text.secondary">
          Press Tab to see the skip link appear. It&apos;s positioned off-screen by default
          but becomes visible when focused.
        </Typography>
        <Box
          id="skip-demo-target"
          tabIndex={-1}
          sx={{
            p: 2,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 1,
          }}
        >
          <Typography variant="body2">
            ✓ This is the skip target. The skip link allows keyboard users to bypass
            repetitive navigation and jump directly here.
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

function AccessibleDemoField() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<{ name: string }>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = () => {
    // No-op for the demo; validation feedback is the important part here.
  };

  return (
    <Box
      component="form"
      noValidate
      aria-label="Example of blur and submit validation"
      sx={{ maxWidth: 420, p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography component="h3" variant="subtitle1" sx={{ mb: 1 }}>
        Mini form example
      </Typography>
      <TextField
        fullWidth
        required
        id="demo-name"
        {...register("name", { required: "Please enter your name." })}
        label="Name"
        error={Boolean(errors.name)}
        helperText={
          errors.name?.message ??
          (isSubmitted
            ? "Required — try submitting without filling this in."
            : "Required — this field participates in blur + submit validation.")
        }
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}

function AccessibleDemoCard() {
  const href = "/forms/dynamic-application";

  return (
    <Card
      component="article"
      variant="outlined"
      sx={{
        maxWidth: 340,
        bgcolor: "background.paper",
        transition: "box-shadow 150ms ease, transform 150ms ease",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
        "&:focus-within": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardActionArea
        component={Link}
        href={href}
        aria-label="Application form"
        aria-describedby="accessibility-demo-card-description"
        sx={{
          display: "block",
          textAlign: "left",
          bgcolor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
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
          avatar={<Assignment />}
          titleTypographyProps={{ component: "h3", variant: "h6" }}
          title="Application form"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            id="accessibility-demo-card-description"
          >
            A real card from the forms dashboard. The whole surface is
            clickable, but it is still announced as a single, well‑named link.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function AccessibilityPage() {
  return (
    <main id="main-content" tabIndex={-1} style={{ outline: "none" }} className="flex min-h-screen w-full flex-col items-center justify-between py-16 bg-white dark:bg-black sm:items-start">
      <Box component="section" sx={{ width: "100%", maxWidth: 1200, mx: "auto", py: 4, px: 2 }}>
        <Typography component="h1" variant="h4">
          Accessibility
        </Typography>

        <Typography component="p" sx={{ mb: 2, mt: 1 }}>
          Accessibility isn&apos;t a checklist—it&apos;s a fundamental part of how this site is built.
          Every decision, from the component structure to the form validation patterns to the color
          choices, is influenced by making the interface work for everyone.
        </Typography>

        <Typography component="p" sx={{ mb: 4 }}>
          This page walks through the specific techniques and patterns used throughout the site,
          showing both the implementation and the reasoning behind each choice. Each section includes
          a live example so you can interact with the feature yourself.
        </Typography>

        <Stack spacing={8} component="section" aria-label="Accessibility features and implementations">
          {/* Skip Navigation */}
          <Box component="article" id="skip-navigation">
            <Stack spacing={1} direction="row" alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
              <Typography component="h2" variant="h5">
                Skip Navigation Links
              </Typography>
              <Chip size="small" label="Live example" sx={{ ml: { xs: 0, sm: 1 } }} />
            </Stack>

            <Typography component="p" sx={{ mb: 2 }}>
              Skip links allow keyboard users to bypass repetitive navigation and jump directly to
              the main content. They&apos;re positioned off-screen by default but become visible when
              focused, providing an immediate escape hatch on every page.
            </Typography>

            <SkipLinkDemo />

            <Typography component="h3" variant="h6" sx={{ mt: 3, mb: 1 }}>
              Implementation Details
            </Typography>

            <Typography component="p" sx={{ mb: 2 }}>
              The skip link is implemented as a component that&apos;s positioned absolutely off-screen
              until it receives keyboard focus. When focused, it appears in the top-left corner with
              high contrast styling and a clear call to action.
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: "grey.50" }}>
              <Typography component="pre" variant="body2" sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
{`<SkipLink href="#main-content">
  Skip to main content
</SkipLink>`}
              </Typography>
            </Paper>

            <List dense>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Positioned using absolute positioning with left: -9999px to keep it off-screen"
                  secondary="This prevents the link from taking up visual space while remaining in the DOM for assistive technology"
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="High z-index (9999) ensures it appears above all other content when focused"
                  secondary="Users can't miss it, and it doesn't get hidden behind modals or overlays"
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Targets #main-content which is set on both PageLayout and SidebarLayout components"
                  secondary="Consistent across all pages, regardless of the layout structure"
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Includes prominent focus styles with outline and background color"
                  secondary="Meets WCAG 2.1 AA contrast requirements (4.5:1 for text)"
                />
              </ListItem>
            </List>
          </Box>

          {/* Form Validation */}
          <Box component="article" id="forms-validation" sx={{ mb: 2 }}>
            <Stack spacing={1} direction="row" alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
              <Typography component="h2" variant="h5">
                Accessible Form Validation
              </Typography>
              <Chip size="small" label="Live example" sx={{ ml: { xs: 0, sm: 1 } }} />
            </Stack>

            <Typography component="p" sx={{ mb: 2 }}>
              Form validation is where accessibility details really matter. This implementation
              validates on blur and submit, provides immediate feedback to assistive technology,
              and automatically focuses the first error after submission.
            </Typography>

            <AccessibleDemoField />

            <Typography component="h3" variant="h6" sx={{ mt: 3, mb: 1 }}>
              How It Works
            </Typography>

            <List dense>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Validation triggers on blur, not on every keystroke"
                  secondary="Users aren't bombarded with errors before they've finished typing. Errors appear when they move away from the field or submit the form."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Error text is associated with the input using aria-describedby"
                  secondary="Screen readers automatically announce the error message when the field receives focus, without requiring the user to navigate to find it."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Error state is communicated through aria-invalid attribute"
                  secondary="Assistive technology can identify which fields have errors programmatically, not just visually."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="First invalid field is focused after submission fails"
                  secondary="React Hook Form's setFocus() moves keyboard focus to the first error, so users don't have to hunt for what went wrong."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Visual error indicators (color + icon) are paired with text"
                  secondary="Color alone isn't sufficient. Every error includes explanatory text that's visible to all users."
                />
              </ListItem>
            </List>

            <Typography component="h3" variant="h6" sx={{ mt: 3, mb: 1 }}>
              Code Implementation
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, bgcolor: "grey.50" }}>
              <Typography component="pre" variant="body2" sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap", fontSize: "0.85rem" }}>
{`const { register, handleSubmit, formState: { errors } } = useForm({
  mode: "onBlur",        // Validate on blur
  reValidateMode: "onBlur"
});

<TextField
  {...register("name", { 
    required: "Please enter your name." 
  })}
  error={Boolean(errors.name)}
  helperText={errors.name?.message}
  aria-invalid={errors.name ? "true" : "false"}
/>`}
              </Typography>
            </Paper>
          </Box>

          {/* Accessible Cards */}
          <Box component="article" id="cards-navigation" sx={{ mb: 2 }}>
            <Stack spacing={1} direction="row" alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
              <Typography component="h2" variant="h5">
                Accessible Cards for Navigation
              </Typography>
              <Chip size="small" label="Live example" sx={{ ml: { xs: 0, sm: 1 } }} />
            </Stack>

            <Typography component="p" sx={{ mb: 2 }}>
              The cards used throughout the site look like cards but behave like links. This
              pattern provides a clean, modern UI while keeping the interaction model simple
              and predictable for all users.
            </Typography>

            <AccessibleDemoCard />

            <Typography component="h3" variant="h6" sx={{ mt: 3, mb: 1 }}>
              Why This Approach Works
            </Typography>

            <List dense>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Single interactive element per card"
                  secondary="No nested links or overlapping click targets. The entire card is one CardActionArea that wraps a Next.js Link component."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Semantic HTML structure with article and heading elements"
                  secondary="Each card is an <article> with a proper <h3> heading. Screen reader users can navigate by landmarks and headings to quickly scan available options."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="aria-label provides concise link text"
                  secondary="The link's accessible name comes from aria-label, which keeps it short and focused. The card's descriptive text is associated separately using aria-describedby."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Explicit focus styles with outline and transform"
                  secondary="Focus indicator includes a 2px outline, 4px offset, and subtle lift effect. Visible to sighted keyboard users without interfering with the design."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Hover and focus states match for consistency"
                  secondary="Both hover and focus trigger the same visual treatment (box shadow + transform), so the interaction feels natural regardless of input method."
                />
              </ListItem>
            </List>

            <Typography component="h3" variant="h6" sx={{ mt: 3, mb: 1 }}>
              Implementation
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, bgcolor: "grey.50" }}>
              <Typography component="pre" variant="body2" sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap", fontSize: "0.85rem" }}>
{`<Card component="article" variant="outlined">
  <CardActionArea
    component={Link}
    href="/forms/dynamic-application"
    aria-label="Application form"
    aria-describedby="card-description"
    sx={{
      "&:focus-visible": {
        outline: "2px solid",
        outlineColor: "primary.main",
        outlineOffset: 4,
      }
    }}
  >
    <CardHeader title="Application form" />
    <CardContent>
      <Typography id="card-description">
        Additional context...
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>`}
              </Typography>
            </Paper>
          </Box>

          {/* Keyboard Navigation */}
          <Box component="article" id="keyboard-navigation">
            <Stack spacing={1} direction="row" alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
              <Typography component="h2" variant="h5">
                Keyboard Navigation &amp; Focus Management
              </Typography>
              <Chip size="small" label="Pattern" sx={{ ml: { xs: 0, sm: 1 } }} />
            </Stack>

            <Typography component="p" sx={{ mb: 2 }}>
              Every interactive element on the site is keyboard accessible. Focus order follows
              the visual layout, focus indicators are always visible, and focus is managed
              programmatically when needed (like after form submission).
            </Typography>

            <List dense>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Tab order matches visual order"
                  secondary="Elements appear in the DOM in the same order they appear visually, so keyboard navigation feels natural and predictable."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="All interactive elements are keyboard reachable"
                  secondary="Buttons, links, form fields, and custom controls all work with Tab, Enter, and Space. No mouse-only interactions."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Focus is programmatically managed after form submission"
                  secondary="When validation fails, focus moves to the first error. When a dialog opens, focus moves inside. When it closes, focus returns to the trigger."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Material-UI components provide baseline keyboard support"
                  secondary="The component library handles Enter/Space on buttons, arrow keys in menus, Escape to close dialogs, and more. Custom components extend these patterns."
                />
              </ListItem>
            </List>
          </Box>

          {/* Semantic HTML and Landmarks */}
          <Box component="article" id="semantic-html">
            <Stack spacing={1} direction="row" alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
              <Typography component="h2" variant="h5">
                Semantic HTML &amp; ARIA Landmarks
              </Typography>
              <Chip size="small" label="Pattern" sx={{ ml: { xs: 0, sm: 1 } }} />
            </Stack>

            <Typography component="p" sx={{ mb: 2 }}>
              The page structure uses proper HTML5 semantic elements and ARIA landmarks to
              create a clear document outline. This allows screen reader users to navigate
              by regions and skip between major sections efficiently.
            </Typography>

            <List dense>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="<main> landmark for primary content"
                  secondary="PageLayout and SidebarLayout both render <main> by default (configurable). Screen readers can jump directly to main content with a single keystroke."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="<nav> for navigation regions"
                  secondary="The app bar and drawer use <nav> elements, making them identifiable as navigation landmarks."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="<article> for independent content blocks"
                  secondary="Cards and self-contained sections use <article> to indicate they could be syndicated or understood independently."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="<aside> for complementary content"
                  secondary="Sidebars use <aside> to distinguish them from the main content flow."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Heading hierarchy (h1 → h2 → h3) maintained throughout"
                  secondary="Every page has exactly one h1. Subsequent headings follow a logical outline without skipping levels."
                />
              </ListItem>
            </List>
          </Box>

          {/* Color Contrast and Visual Design */}
          <Box component="article" id="color-contrast">
            <Stack spacing={1} direction="row" alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
              <Typography component="h2" variant="h5">
                Color Contrast &amp; Visual Accessibility
              </Typography>
              <Chip size="small" label="Pattern" sx={{ ml: { xs: 0, sm: 1 } }} />
            </Stack>

            <Typography component="p" sx={{ mb: 2 }}>
              The color palette and typography are selected to meet WCAG 2.1 AA standards.
              Information isn&apos;t conveyed by color alone, and interactive elements are
              visually distinct even for users with color vision deficiencies.
            </Typography>

            <List dense>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Text contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large)"
                  secondary="Body text, headings, and labels all pass automated contrast checks. Tested with both light and dark themes."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Focus indicators have 3:1 contrast against the background"
                  secondary="WCAG 2.1 requires focus indicators to be visible. All focus styles use sufficient contrast and offset."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Error states use icon + color + text"
                  secondary="Form errors aren't just red—they include an icon and descriptive text. Users who can't perceive color still understand what's wrong."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Links are distinguishable from surrounding text"
                  secondary="Links use underline or distinct color with sufficient contrast. Hover/focus states provide additional visual feedback."
                />
              </ListItem>
            </List>
          </Box>

          {/* ARIA and Dynamic Content */}
          <Box component="article" id="aria-dynamic">
            <Stack spacing={1} direction="row" alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
              <Typography component="h2" variant="h5">
                ARIA &amp; Dynamic Content Announcements
              </Typography>
              <Chip size="small" label="Pattern" sx={{ ml: { xs: 0, sm: 1 } }} />
            </Stack>

            <Typography component="p" sx={{ mb: 2 }}>
              When content changes dynamically (form errors, data loading, live chart updates),
              assistive technology users need to know about it. ARIA attributes and live regions
              ensure these changes are announced appropriately.
            </Typography>

            <List dense>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Form errors use aria-invalid and aria-describedby"
                  secondary="When a field becomes invalid, aria-invalid='true' is set and the error message is connected via aria-describedby. Screen readers announce the error when the field receives focus."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Loading states communicated with aria-busy and aria-live"
                  secondary="Skeleton screens and loading indicators use aria-busy='true'. When content loads, screen readers can announce the change based on the aria-live setting."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Charts include text alternatives and aria-label"
                  secondary="D3 visualizations receive descriptive aria-label attributes summarizing the data. The data is also available in table format for users who can't perceive graphics."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Modal dialogs use aria-modal and trap focus"
                  secondary="When a dialog opens, aria-modal='true' is set, focus moves inside, and tab/shift+tab are trapped within the dialog until it closes."
                />
              </ListItem>
            </List>
          </Box>

          {/* Testing and Validation */}
          <Box component="article" id="testing">
            <Stack spacing={1} direction="row" alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
              <Typography component="h2" variant="h5">
                Testing &amp; Continuous Validation
              </Typography>
              <Chip size="small" label="Process" sx={{ ml: { xs: 0, sm: 1 } }} />
            </Stack>

            <Typography component="p" sx={{ mb: 2 }}>
              Accessibility isn&apos;t something you can bolt on at the end—it&apos;s validated
              continuously throughout development. This site uses automated tests, manual audits,
              and real assistive technology to catch issues early.
            </Typography>

            <List dense>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Jest + Testing Library with accessibility assertions"
                  secondary="Every component includes tests that check for proper ARIA attributes, keyboard interactions, and semantic HTML. Tests fail if accessibility regressions are introduced."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Axe-core integration for automated scanning"
                  secondary="Tests run axe-core to detect common accessibility issues like missing labels, insufficient contrast, and invalid ARIA usage."
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Manual keyboard navigation testing"
                  secondary="Every interactive flow is tested with keyboard only. Can you complete forms, navigate between pages, and access all content without a mouse?"
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Screen reader testing with NVDA and JAWS"
                  secondary="Critical user journeys are tested with actual screen readers to ensure they make sense when navigated non-visually."
                />
              </ListItem>
            </List>
          </Box>
        </Stack>

        <Box sx={{ mt: 8, p: 3, bgcolor: "primary.50", color: "text.primary", borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Want to learn more?
          </Typography>
          <Typography variant="body2">
            The patterns demonstrated here are applied throughout every page of this site.
            Explore the <Link href="/forms" style={{ color: "inherit", textDecoration: "underline" }}>forms section</Link> to
            see validation in action, or check the <Link href="/data-visualization" style={{ color: "inherit", textDecoration: "underline" }}>data visualization page</Link> for
            accessible chart examples.
          </Typography>
        </Box>
      </Box>
    </main>
  );
}
