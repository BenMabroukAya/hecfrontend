import {
  Alert, Box,
  Card, CardContent, CardMedia,
  Chip, CircularProgress,
  Container,
  Grid,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ListProjectsCard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/projects');
        setProjects(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Projets</Typography>
        {/*<Button component={Link} to="/projects/add" startIcon={<Add />} variant="contained">
          Ajouter
        </Button>*/}
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="160"
                image={project.photo}
                alt={project.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6">{project.title}</Typography>
                <Typography variant="body2" paragraph>{project.description}</Typography>
                <Chip 
                  label={project.status} 
                  color={project.status === 'Terminé' ? 'success' : 'primary'} 
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListProjectsCard;