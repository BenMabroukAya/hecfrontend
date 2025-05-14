import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditCategorie = () => {
  const [Datecategorie, setDatecategorie] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCategorie();
  }, []);

  const loadCategorie = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/categories/${id}`);
      setDatecategorie(res.data.Datecategorie);
    } catch (err) {
      console.error("Erreur chargement catégorie :", err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/categories/${id}`, { Datecategorie });
      navigate("/categories");
    } catch (err) {
      console.error("Erreur mise à jour :", err);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Modifier la Catégorie</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="editDateCategorie" className="mb-3">
          <Form.Label>Année de la catégorie</Form.Label>
          <Form.Control
            type="text"
            value={Datecategorie}
            onChange={(e) => setDatecategorie(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">💾 Mettre à jour</Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate("/categories")}>↩️ Annuler</Button>
      </Form>
    </Container>
  );
};

export default EditCategorie;
