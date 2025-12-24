import { Stack, Typography, Card, CardContent } from "@mui/material";
import { ExperienceListItem } from "./experience-list-item";
import { ExperienceData } from "../../types/experience";

interface ExperienceListProps {
  experiences: ExperienceData[];
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <Stack spacing={6} sx={{ width: '100%', p: 2, mb: 4 }}>
      <Card 
        elevation={2}
        sx={{ 
          background: 'background.paper',
          borderLeft: 3,
          borderColor: 'primary.main',
          mb: 1
        }}
      >
        <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
          <Typography variant="h3" component="h1" fontWeight="700">
            Experience
          </Typography>
        </CardContent>
      </Card>

      {experiences.map((experience, index) => (
        <ExperienceListItem key={index} experience={experience} />
      ))}
    </Stack>
  );
}
