"use client";

import { Box, Typography, Stack, Chip, Grid } from "@mui/material";
import { experiences } from "@/app/data/experiences";
import Image from "next/image";
import { VectorRenderer } from "@/app/components/vector-renderer/vector-renderer";

export default function AboutPage() {
  const aboutSkills = {
    languages: ["JavaScript (ES6+)", "TypeScript", "HTML/CSS/SCSS"],
    technologies: [
      "Vue 3", "React", "Angular", "Next.js",
      "Tailwind", "Material UI", "Bootstrap",
      "Jest", "React Testing Library", "Axe",
      "GraphQL", "REST APIs", "Node.js",
      "PostgreSQL/Supabase"
    ],
    accessibility: ["WCAG 2.1 AA", "Section 508", "ARIA", "Axe", "JAWS", "NVDA"],
    specializations: [
      "Design Systems", "Component Library",
      "i18n Architecture", "Translation Workflows"
    ],
    other: [
      "REST API Integration", "API Design",
      "State Management (Vuex, Redux)",
      "CI/CD (Git workflows, Octopus Deploy)",
      "Data Visualization (MUI X Charts, Chart.JS)"
    ]
  };

  const skillColors = {
    languages: 'primary.main',
    technologies: 'primary.main',
    accessibility: 'primary.main',
    specializations: 'primary.main',
    other: 'primary.main'
  };

  return (
    <Box 
      component="main" 
      id="main-content" 
      tabIndex={-1}
      sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
        width: '100%',
        mt: '68px'
      }}
    >
      {/* Left Column - Profile & Skills */}
      <Box 
        sx={{ 
          width: { xs: '100%', md: '30%', lg: '25%' },
          minWidth: { md: '300px' },
          bgcolor: 'grey.50',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Name & Title */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            component="h1" 
            variant="h4" 
            fontWeight="700"
            sx={{ mb: 1, color: 'text.primary' }}
          >
            Randy Grizzle
          </Typography>
          <Typography 
            component="p" 
            variant="h6" 
            sx={{ color: 'text.secondary', fontWeight: 500 }}
          >
            Senior Frontend Engineer
          </Typography>
        </Box>

        {/* Skills */}
        <Stack spacing={4}>
          {Object.entries(aboutSkills).map(([category, skills]) => (
            <Box key={category}>
              <Typography 
                variant="h6" 
                component="h2"
                sx={{ 
                  mb: 2, 
                  fontWeight: 700,
                  color: skillColors[category as keyof typeof skillColors],
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {category}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {skills.map((skill) => (
                  <Typography 
                    key={skill}
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      '&:not(:last-child)::after': {
                        content: '"•"',
                        ml: 1,
                        color: 'text.disabled'
                      }
                    }}
                  >
                    {skill}
                  </Typography>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Right Column - Experience */}
      <Box 
        sx={{ 
          width: { xs: '100%', md: '70%', lg: '75%' },
          flex: { md: 1 },
          p: 4,
          bgcolor: 'background.default'
        }}
      >
        <Typography 
          component="h2" 
          variant="h4" 
          fontWeight="600"
          sx={{ mb: 2 }}
        >
          Experience
        </Typography>

        <Stack spacing={4}>
          {experiences.map((experience, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: 'primary.50',
                borderRadius: 0,
                overflow: 'hidden',
              }}
            >
              <Grid container>
                {/* Image Section */}
                <Grid size={{ xs: 12, lg: 3 }}>
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 2.5,
                    p: 3,
                    bgcolor: 'grey.50',
                    height: '100%'
                  }}>
                    {experience.images.map((img, imgIndex) => (
                      <Box 
                        key={imgIndex} 
                        sx={{ 
                          display: 'flex',
                          flexDirection: { xs: 'row', md: 'column'},
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          width: '100%',
                          maxWidth: experience.images.length > 1 
                            ? { xs: '160px', sm: '200px' }
                            : { xs: '100%' }
                        }}
                      >
                        {img.isVector ? (
                          <VectorRenderer glyph={img.image} title={img.alt} />
                        ) : (
                          <Image 
                            src={img.image} 
                            alt={img.alt} 
                            priority={imgIndex === 0} 
                            style={{ height: 'auto' }} 
                            
                          />
                        )}
                      </Box>
                    ))}
                  </Box>
                </Grid>

                {/* Content Section */}
                <Grid size={{ xs: 12, lg: 9 }}>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h5" component="h3" fontWeight="600" sx={{ mb: 0.5 }}>
                      {experience.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {experience.subtitle}
                    </Typography>

                    {/* Impact Chips */}
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                      {experience.impacts.map((impact, impactIndex) => (
                        <Chip 
                          key={impactIndex} 
                          label={impact.label} 
                          color={impact.color} 
                          size="small" 
                        />
                      ))}
                    </Stack>

                    {/* Contributions */}
                    <Stack spacing={2}>
                      {experience.contributions.map((contribution, contribIndex) => (
                        <Typography 
                          key={contribIndex} 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ lineHeight: 1.7 }}
                        >
                          {contribution}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
