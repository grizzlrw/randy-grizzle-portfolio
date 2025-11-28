
import Code from "./components/code/Code";
import SkillList from "./components/skill-card/skill-list";
import HomeHero from "./_home/home-hero";

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-16 bg-white dark:bg-black sm:items-start">
       
        <HomeHero></HomeHero>

        <SkillList length={4}></SkillList>

        {/* <Code language="jsx">
            {`
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography component="h2" variant="h3" sx={{ color: '#ffffff' }}>Randy Grizzle</Typography>
                <Typography component="p" variant="h4" sx={{ py: 2, color: '#ffffff' }}>Senior Frontend Developer and Digital Accessibility Specialist</Typography>
                <Button color="secondary" variant="contained">Learn More</Button>
              </Box>
            `}
          </Code> */}

       
      </main>
    </div>
  );
}
