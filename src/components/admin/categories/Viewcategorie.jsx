import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardCategorie from "./CardCategorie";

const ViewCategorie = () => {
  const [categorie, setCategorie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();

  useEffect(() => {
    const loadCategorie = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/api/categories/${id}`);
        setCategorie(result.data);
      } catch (err) {
        setError(err.message);
        console.error("Erreur chargement catégorie:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCategorie();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Chargement...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <CardCategorie categorie={categorie} />
  );
};

export default ViewCategorie;
