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
} from "@mui/material";
import { Assignment } from "@mui/icons-material";
import { CardActionArea } from "@mui/material";
import { useForm } from "react-hook-form";
import { Check } from "@mui/icons-material";

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
    <main className="flex min-h-screen w-full flex-col items-center justify-between py-16 bg-white dark:bg-black sm:items-start">
      <Box component="section" sx={{ width: "100%", maxWidth: 960, mx: "auto", py: 4, px: 2 }}>
        <Typography component="h1" variant="h4">
          Accessibility
        </Typography>

        <Typography component="p" sx={{ mb: 4, mt: 1 }}>
          A lot of care went into making these interfaces work for more than one
          kind of user. This page walks through some of the decisions behind the
          forms, navigation, and cards, and pairs each explanation with a small
          live example.
        </Typography>

        <Stack spacing={6} component="section" aria-label="Accessibility examples and explanations">
          <Box component="article" id="forms-validation" sx={{ mb: 2 }}>
            <Stack spacing={1} direction="row" alignItems="center" flexWrap="wrap" sx={{ mb: 1 }}>
              <Typography component="h2" variant="h5">
                Accessible Form Design
              </Typography>
              <Chip size="small" label="Live example" sx={{ ml: { xs: 0, sm: 1 } }} />
            </Stack>

            <Typography component="p" sx={{ mb: 2 }}>
              Forms are where most of the detail work shows up. Validation runs on
              blur and on submit so you get feedback quickly, but the page doesn&apos;t
              light up with errors before you&apos;ve typed a single character.
            </Typography>

            <AccessibleDemoField />

            <List dense sx={{ mt: 2 }}>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText primary="Errors are only displayed when they become relevant to provide a more pleasant user experience." />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText primary="The first invalid field is focused and scrolled into view after submission." />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText primary="Error text dynamically appears and announces itself to assistive technologies, ensuring users are immediately informed of issues." />
              </ListItem>
            </List>
          </Box>

          <Box component="article" id="cards-navigation" sx={{ mb: 2 }}>
            <Stack spacing={1} direction="row" alignItems="center" flexWrap="wrap" sx={{ mb: 1 }}>
              <Typography component="h2" variant="h5">
                Accessible Cards for Navigation
              </Typography>
              <Chip size="small" label="Live example" sx={{ ml: { xs: 0, sm: 1 } }} />
            </Stack>

            <Typography component="p" sx={{ mb: 2 }}>
              The cards on the forms landing page are styled like cards, but behave
              like normal links. There&apos;s a single interactive element per card,
              and its accessible name comes from the title instead of the whole
              block of copy.
            </Typography>

            <Typography component="p" sx={{ mb: 2 }}>
              Additionally, aria-descriptions are implemented to provide extra context that is
              easily available to users, but is intentionally separated from the header
              text.  This helps screen reader users quickly identify the main purpose of the link,
              and grants the choice of listening longer for more information.
            </Typography>

            <AccessibleDemoCard />

            <List dense sx={{ mt: 2 }}>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText primary="Each card is an article with a proper heading so you can skim with a screen reader." />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText primary="There&apos;s a single link per card instead of overlapping clickable regions." />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText primary="Focus styles are explicit so keyboard users can see exactly which card is active." />
              </ListItem>
            </List>
          </Box>

          <Box component="article" id="layout-and-navigation" sx={{ mb: 2 }}>
            <Stack spacing={1} direction="row" alignItems="center" flexWrap="wrap" sx={{ mb: 1 }}>
              <Typography component="h2" variant="h5">
                Intuitive Layout
              </Typography>
              <Chip size="small" label="Pattern" sx={{ ml: { xs: 0, sm: 1 } }} />
            </Stack>

            <Typography component="p" sx={{ mb: 1 }}>
              The layout is designed to be predictable on purpose: clear
              landmarks, shared chrome, and keyboard-friendly components so you
              can move around quickly no matter how you navigate.
            </Typography>

            <List dense>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText primary="The main content lives in a proper main region so assistive technology users can jump straight to it." />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText primary="The app bar, navigation, and clipped drawer are shared across pages so the chrome doesn&apos;t change out from under you." />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon>
                  <Check fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText primary="Interactive pieces lean on the component library for focus management and ARIA attributes, then add custom behavior on top where it actually adds value." />
              </ListItem>
            </List>
          </Box>
        </Stack>
      </Box>
    </main>
  );
}
