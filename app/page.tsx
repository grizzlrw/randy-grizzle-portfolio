import { Suspense } from "react";
import SkillList from "./components/skill-card/skill-list";
import HomeHero from "./_home/home-hero";
import { Box, Grid } from "@mui/material";
import SkillListSkeleton from "./components/skeletons/SkillListSkeleton";
import { ExperienceList } from "./components/experience/experience-list";
import { experiences } from "./data/experiences";

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <Box
      sx={{ display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      width: '100%' }}>
      <Box component={'main'}
        id="main-content"
        tabIndex={-1}
        sx={{ display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'primary.50',
        }}
       >
       
        <HomeHero></HomeHero>

        <ExperienceList experiences={experiences} />
    
      </Box>
    </Box>
  );
}
