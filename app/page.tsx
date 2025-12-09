
import Code from "./components/code/Code";
import SkillList from "./components/skill-card/skill-list";
import HomeHero from "./_home/home-hero";
import { Typography, Box } from "@mui/material";

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
        sx={{ display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'primary.50',
        }}
       // className="flex min-h-screen w-full flex-col items-center justify-between py-16 bg-white dark:bg-black sm:items-start"
       >
       
        <HomeHero></HomeHero>

        <Box sx={{ p: 4, zIndex: 4 }}>
          {/* <Typography component="h2" variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', py: 4 }}>Solutions I Can Build For You</Typography> */}
          <SkillList length={4}></SkillList>
        </Box>
    
      </Box>
    </Box>
  );
}
