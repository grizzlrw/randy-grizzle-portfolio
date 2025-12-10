'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';

export type SkillCardProps = {
    id: string;
    title: string;
    description: string;
    route: string;
    headerComponentType?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    imageUrl?: string;
    imageAlt?: string;
}

export default function SkillCard({ id, title, description, route, headerComponentType = 'h2', imageUrl, imageAlt }: SkillCardProps) {
    return (
        <Card sx={{ 
            textAlign: 'left', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid',
            borderColor: 'divider',
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyItems: 'space-evenly',
        }}>
            <CardMedia title={`${imageAlt || title}`} sx={{ 
                    height: '10rem', 
                    clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0% 100%)', 
                    objectFit: 'cover', 
                    overflow: 'hidden',
                    backgroundImage: `${imageUrl ? `url(${imageUrl})` : 'none'}`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    }}>

            </CardMedia>
            <CardHeader id={`${id}-header`} component={headerComponentType} title={title}></CardHeader>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box id={`${id}-description`} sx={{ textAlign: 'left' }}>
                    <Typography component="p">{description}</Typography>
                    
                </Box>
            </CardContent>
            <CardActions>
                <Button 
                    href={route} 
                    component={Link} 
                    aria-describedby={`${id}-header`}
                    sx={{
                        transition: 'color 0.2s ease-in-out',
                    }}
                >
                    Learn More
                </Button>
            </CardActions>
        </Card>
    )
}