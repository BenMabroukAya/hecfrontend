import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Cardscategorie = ({ scategorie }) => {
  return (
    <Card sx={{ minWidth: 275, minHeight: 180 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {scategorie.nomScategorie}
        </Typography>
        {scategorie.categorieID && (
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            ID Catégorie : {scategorie.categorieID}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Link to={`/editscategorie/${scategorie._id}`}>
          <Button size="small" variant="contained">Modifier</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Cardscategorie;
