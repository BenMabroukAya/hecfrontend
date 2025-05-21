import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import RoomIcon from '@mui/icons-material/Room';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { Box, Button, Container, Grid, Link as MuiLink, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Menu from './Menu';

const slides = [
  {
    title: 'Expertise Électrique de Confiance',
    description: 'Des solutions d’ingénierie électrique pour tous vos projets résidentiels, industriels et commerciaux.',
    image: 'https://res.cloudinary.com/dmfvxi601/image/upload/v1747842844/pexels-pixabay-236089_fy4anw.jpg',
  },
  {
    title: 'Innovation & Performance',
    description: 'Nous combinons technologie moderne et rigueur technique pour garantir des installations sécurisées et durables.',
    image: 'https://res.cloudinary.com/dmfvxi601/image/upload/v1747841108/tech_m4f5mq.jpg',
  },
  {
    title: 'HEC Électricité – Votre Partenaire Ingénierie',
    description: 'Études, supervision, dimensionnement, et performance énergétique : un accompagnement complet.',
    image: 'https://res.cloudinary.com/dmfvxi601/image/upload/v1747841039/circuit_ymu9fm.png',
  }
];

const HomePage = () => {
  
  const scrollToAbout = () => {
    const section = document.getElementById("about-section");
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    
    <div> 
      <Menu />

      {/* Hero Carousel */}
      <Carousel animation="fade" navButtonsAlwaysVisible>
        {slides.map((slide, i) => (
          <Box key={i} sx={{ position: 'relative', height: '90vh', color: 'white' }}>
            <img
              src={slide.image}
              alt={slide.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }}
            />
            <Box sx={{ position: 'absolute', top: '30%', left: '10%', maxWidth: '600px' }}>
              <Typography variant="h3" gutterBottom>{slide.title}</Typography>
              <Typography variant="h6" sx={{ mb: 3 }}>{slide.description}</Typography>
              <Button variant="contained" color="primary" onClick={scrollToAbout}>En savoir plus</Button>
            </Box>
          </Box>
        ))}
      </Carousel>

      {/* À propos */}
      <Container id="about-section" sx={{ my: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>À Propos de Nous</Typography>
            <Typography paragraph>
              HEC Électricité est un bureau d'études en électricité reconnu pour son expertise technique et son engagement envers la qualité.
              Nous fournissons des solutions d'ingénierie pour les secteurs résidentiels, industriels, et commerciaux.
            </Typography>
            <Typography paragraph>
              Nos services incluent : études de conception, calculs de dimensionnement, analyses de conformité, simulations de performance énergétique, et gestion de projet.
            </Typography>
            <Typography paragraph>
              Notre vision : Être le leader des études électriques en intégrant technologie et bonnes pratiques.
              Notre mission : Fournir des études précises et des conseils experts pour assurer des projets sûrs et conformes.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://res.cloudinary.com/dmfvxi601/image/upload/v1747841083/male-electrician_qbdqpy.jpg"
              alt="Électricien"
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Coordonnées */}
      <Box sx={{ backgroundColor: '#f4f4f4', py: 6 }}>
        <Container>
          <Typography variant="h5" gutterBottom>Contact</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                <RoomIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                <MuiLink href="https://www.google.com/maps?q=Immeuble+Hassen,+Denden" target="_blank" underline="hover">
                  Bureau N°3-2, Immeuble Hassen, Avenue de L'Indépendance - Denden (Face à L'Artisanat)
                </MuiLink>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <PhoneIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Tél : 00 216 31 406 232
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <SmartphoneIcon sx={{ verticalAlign: 'middle', mr: 1 }} />GSM : 50 988 526
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <EmailIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                <MuiLink href="mailto:hammami.ec@gmail.com" underline="hover">hammami.ec@gmail.com</MuiLink> /{' '}
                <MuiLink href="mailto:direction.hec@gmail.com" underline="hover">direction.hec@gmail.com</MuiLink>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default HomePage;