import { Card, Box, CardHeader, CardContent, Typography, Chip, Divider, Stack } from "@mui/material";
import Image from "next/image";
import { VectorRenderer } from "../vector-renderer/vector-renderer";
import { ExperienceData } from "../../types/experience";

interface ExperienceListItemProps {
  experience: ExperienceData;
}

export function ExperienceListItem({ experience }: ExperienceListItemProps) {
  const { images, title, subtitle, impacts, contributions } = experience;

  return (
    <Card elevation={3} sx={{ overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Image Section */}
        <Box sx={{ 
          width: { xs: '100%', md: '25%' }, 
          display: 'flex',
          flexDirection: images.length > 1 ? 'row' : 'column',
          flexWrap: images.length > 1 ? 'wrap' : 'nowrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          p: 3,
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50'
        }}>
          {images.map((img, index) => (
            <Box 
              key={index} 
              sx={{ 
                flex: images.length > 1 ? '1 1 40%' : '0 0 auto',
                minWidth: images.length > 1 ? '40%' : 'auto',
                maxWidth: images.length > 1 ? '45%' : '100%',
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {img.isVector ? (
                <VectorRenderer glyph={img.image} title={img.alt} />
              ) : (
                <Image src={img.image} alt={img.alt} priority={index === 0} style={{ maxWidth: '100%', height: 'auto' }} />
              )}
            </Box>
          ))}
        </Box>

        {/* Content Section */}
        <Box sx={{ width: { xs: '100%', md: '75%' }, display: 'flex', flexDirection: 'column' }}>
          <CardHeader 
            sx={{ pb: 2 }} 
            title={
              <Typography variant="h4" component="h2" fontWeight="600">
                {title}
              </Typography>
            }
            subheader={
              <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            }
          />
          
          <CardContent sx={{ pt: 0 }}>
            {/* Key Achievements Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Impact
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                {impacts.map((impact, index) => (
                  <Chip 
                    key={index} 
                    label={impact.label} 
                    color={impact.color} 
                    size="small" 
                  />
                ))}
              </Stack>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Key Contributions */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Key Contributions
              </Typography>

              {contributions.map((contribution, index) => (
                <Box 
                  key={index} 
                  sx={{ mb: index === contributions.length - 1 ? 0 : 2.5 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {contribution}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
}
