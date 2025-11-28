import React from 'react';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Media from '@/app/assets/vectors/Media.svg';
import Idea from '@/app/assets/vectors/Idea.svg';
import Collaborate from '@/app/assets/vectors/Collaborate.svg';
import Launch from '@/app/assets/vectors/Launch.svg';
import { CircleIcon } from '@/app/components/circle/circle-icon';

export default function VectorButtons() {
    return (
        <Grid container spacing={4} rowSpacing={12} sx={{ px: 4, py: 12, width: '100%', justifyContent: 'space-around' }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Item>
              <CircleIcon
                glyph={Media}
                title="Woman with floating media icons around her"
                glyphScale={1.1}
                size={"80%"}
                glyphOffsetYPercent={-5}
              />
              <Typography component={"h3"} variant={"h4"} sx={{ textAlign: 'center', my: 4 }}>Accessibility</Typography>
            </Item>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Item>
              <Link href="/articles/modularity">
                <Box>
                  <CircleIcon
                    glyph={Idea}
                    title="Man holding lightbulb and pointing to modular site map"
                    glyphScale={1.3}
                    size={"80%"}
                    glyphOffsetYPercent={-5}  // pull it up a bit if you want
                  />
                  <Typography component={"h3"} variant={"h4"} sx={{ textAlign: 'center', my: 4 }}>Modularity</Typography>
                </Box>
              </Link>
              
              
            </Item>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Item>
              <CircleIcon
                glyph={Collaborate}
                title="People working together to build a website"
                glyphScale={1.3}
                size={"80%"}
                glyphOffsetYPercent={-5}
              />
            </Item>
            <Typography component={"h3"} variant={"h4"} sx={{ textAlign: 'center', my: 4 }}>Collaboration</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Item>
              <CircleIcon
                glyph={Launch}
                title="Man holding a rocketship during launch"
                glyphScale={1.1}
                size={"80%"}
                glyphOffsetYPercent={-5}
              />
            </Item>
            <Typography component={"h3"} variant={"h4"} sx={{ textAlign: 'center', my: 4 }}>Deployment</Typography>
          </Grid>
        </Grid>
    )
}