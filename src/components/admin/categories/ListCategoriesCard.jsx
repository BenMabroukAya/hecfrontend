import { Add } from '@mui/icons-material';
import {
    Alert, Box, Button, Card, CardContent,
    CircularProgress, Container, Grid, Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
  
  const ListCategoriesCard = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const res = await axios.get('http://localhost:3000/api/categories');
          setCategories(res.data);
        } catch (err) {
          setError(err.response?.data?.message || err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchCategories();
    }, []);
  
    if (loading) return <CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />;
    if (error) return <Alert severity="error">{error}</Alert>;
  
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4">Catégories</Typography>
          <Button component={Link} to="/categories/add" startIcon={<Add />} variant="contained">
            Ajouter
          </Button>
        </Box>
  
        <Grid container spacing={3}>
          {categories.map((categorie) => (
            <Grid item xs={12} sm={6} md={4} key={categorie._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {categorie.Datecategorie}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID : {categorie._id}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  };
  
  export default ListCategoriesCard;
  