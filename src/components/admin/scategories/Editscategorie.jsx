import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Editscategorie() {
  const { id } = useParams();
  const [nomScategorie, setNomScategorie] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/scategories/${id}`)
      .then(res => {
        setNomScategorie(res.data.nomScategorie);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/scategories/${id}`, { nomScategorie });
    navigate('/scategories');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Modifier la sous-catégorie</h2>
      <TextField
        label="Nom de sous-catégorie"
        value={nomScategorie}
        onChange={(e) => setNomScategorie(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Enregistrer
      </Button>
    </form>
  );
}

export default Editscategorie;