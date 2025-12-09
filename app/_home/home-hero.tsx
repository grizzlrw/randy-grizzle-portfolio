import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import backgroundImage from '@/app/assets/images/audio-9825713_1920.jpg'; // Path to your image in the public folder

export default function HomeHero() {
    return (
        <Box sx={{ 
          width: '100%', 
          py: 16, 
          px: 4, 
          gap: 4, 
          textAlign: 'center', 
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative' 
          }}>
          <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: 1 
          }}>
          </Box>

          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography 
                component="h3" 
                variant="h3" 
                sx={{ 
                    color: '#ffffff',
                    animation: 'fadeInUp 0.8s ease-out',
                    '@keyframes fadeInUp': {
                        from: {
                            opacity: 0,
                            transform: 'translateY(30px)',
                        },
                        to: {
                            opacity: 1,
                            transform: 'translateY(0)',
                        },
                    },
                }}
            >
                Randy Grizzle
            </Typography>
            <Typography 
                component="p" 
                variant="h4" 
                sx={{ 
                    py: 2, 
                    color: '#ffffff',
                    animation: 'fadeInUp 0.8s ease-out 0.2s both',
                    '@keyframes fadeInUp': {
                        from: {
                            opacity: 0,
                            transform: 'translateY(30px)',
                        },
                        to: {
                            opacity: 1,
                            transform: 'translateY(0)',
                        },
                    },
                }}
            >
                Senior Frontend Developer and Digital Accessibility Specialist
            </Typography>
            <Button 
                color="secondary" 
                variant="contained" 
                href="/about"
                sx={{
                    animation: 'fadeInUp 0.8s ease-out 0.4s both',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 4,
                    },
                    '@keyframes fadeInUp': {
                        from: {
                            opacity: 0,
                            transform: 'translateY(30px)',
                        },
                        to: {
                            opacity: 1,
                            transform: 'translateY(0)',
                        },
                    },
                }}
            >
                Learn More
            </Button>
          </Box>
        </Box>
    )
}