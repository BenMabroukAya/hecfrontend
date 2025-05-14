import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Insertscategorie() {
  const [nomScategorie, setNomScategorie] = useState('');
  //const [categorieID, setCategorieID] = useState('');
  //const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  /*useEffect(() => {
    axios.get('http://localhost:3000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/scategories', { nomScategorie//, categorieID 
     });
    navigate('/scategories');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une sous-catégorie</h2>
      <TextField
        label="Nom de sous-catégorie"
        value={nomScategorie}
        onChange={(e) => setNomScategorie(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      {/*<TextField
        select
        label="Catégorie"
        value={categorieID}
        onChange={(e) => setCategorieID(e.target.value)}
        required
        fullWidth
        margin="normal"
      >
        {categories.map((cat) => (
          <MenuItem key={cat._id} value={cat._id}>
            {cat.Datecategorie}
          </MenuItem>
        ))}
      </TextField>*/}
      <Button type="submit" variant="contained" color="primary">
        Ajouter
      </Button>
    </form>
  );
}

export default Insertscategorie;
