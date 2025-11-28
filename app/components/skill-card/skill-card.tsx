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
    imageUrl?: string;
    imageAlt?: string;
}

export default function SkillCard({ id, title, description, route, imageUrl, imageAlt }: SkillCardProps) {
    return (
        <Card sx={{ textAlign: 'left', boxShadow: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'space-evenly' }}>
            <CardMedia title={`${imageAlt || title}`} sx={{ 
                height: '10rem', 
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 92%)', 
                objectFit: 'cover', 
                overflow: 'hidden',
                backgroundImage: `${imageUrl ? `url(${imageUrl})` : 'none'}`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}>
            </CardMedia>
            <CardHeader id={`${id}-header`} component={"h2"} title={title}></CardHeader>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box id={`${id}-description`} sx={{ textAlign: 'left' }}>
                    <Typography component="p">{description}</Typography>
                    
                </Box>
            </CardContent>
            <CardActions>
                <Button href={route} component={Link} aria-describedby={`${id}-header`}>Learn More</Button>
            </CardActions>
        </Card>
    )
}