import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cardscategorie from './Cardscategorie';

const ListscategoriesCard = () => {
  const [scategories, setScategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/scategories')
      .then(res => setScategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Liste des sous-catégories
      </Typography>
      <Grid container spacing={3}>
        {scategories.map(scategorie => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={scategorie._id}>
            <Cardscategorie scategorie={scategorie} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ListscategoriesCard;
