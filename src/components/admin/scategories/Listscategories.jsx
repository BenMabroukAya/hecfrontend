import { Button } from '@mui/material';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Listscategories() {
  const [scategories, setScategories] = useState([]);

  useEffect(() => {
    fetchScategories();
  }, []);

  const fetchScategories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/scategories');
      setScategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?")) {
      try {
        await axios.delete(`http://localhost:3000/api/scategories/${id}`);
        fetchScategories(); // Rafraîchir la liste
        alert("Sous-catégorie supprimée avec succès");
      } catch (err) {
        console.error("Erreur lors de la suppression:", err);
        alert("Erreur lors de la suppression");
      }
    }
  };

  return (
    <div>
      <h2>Liste des sous-catégories</h2>
      <Link to="/scategories/add">
        <Button variant="contained" color="success" style={{ marginBottom: '10px' }}>
          Ajouter une sous-catégorie
        </Button>
      </Link>
      <MUIDataTable
        title="Sous-catégories"
        data={scategories}
        columns={[
          { label: 'Nom de sous-catégorie', name: 'nomScategorie' },
          { label: 'ID Catégorie', name: 'categorieID' },
          {
            name: 'Actions',
            options: {
              customBodyRender: (value, tableMeta) => {
                const id = scategories[tableMeta.rowIndex]._id;
                return (
                  <div>
                    <Link to={`/scategories/edit/${id}`}>
                      <Button variant="contained" color="primary" style={{marginRight: '10px'}}>
                        Modifier
                      </Button>
                    </Link>
                    <Button 
                      variant="contained" 
                      color="error"
                      onClick={() => handleDelete(id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                );
              }
            }
          }
        ]}
        options={{ selectableRows: "none" }}
      />
    </div>
  );
}

export default Listscategories;