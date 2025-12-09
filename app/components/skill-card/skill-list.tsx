import SkillCard from './skill-card';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { fetchSkills } from "@/lib/actions";

export default async function SkillList({length}: {length?: number}) {
    const skills = await fetchSkills();
    
    return (
        <Box sx={{ width: '100%', py: 2, gap: 4, position: 'relative' }}>
            <Grid component={"ul"} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 6, md: 6, lg: 12 }} sx={{ alignItems: "stretch" }}>
                {Array.from(skills).map(({...skill}, index) => (
                    <Grid component={"li"} key={index} size={{ xs: 2, sm: 3, md: 3 }} sx={{  display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                        <Item sx={{ flexGrow: 1 }}>
                            <SkillCard
                                id={skill.id.toString()}
                                title={skill.title}
                                description={skill.description}
                                imageUrl={skill.imageUrl}
                                imageAlt={skill.imageAlt}
                                route={skill.route}
                            ></SkillCard>
                        </Item>
                    </Grid>
                )).filter((_, index) => (length ? index < length : true))}
            </Grid>
        </Box>
    )
}