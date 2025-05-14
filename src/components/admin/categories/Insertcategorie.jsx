import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const InsertCategorie = () => {
  const [Datecategorie, setDatecategorie] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/categories", { Datecategorie });
      navigate("/categories");
    } catch (err) {
      console.error("Erreur lors de l'insertion :", err);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Ajouter une Catégorie</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="dateCategorie" className="mb-3">
          <Form.Label>Année de la catégorie</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex : 2025"
            value={Datecategorie}
            onChange={(e) => setDatecategorie(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">💾 Enregistrer</Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate("/categories")}>↩️ Annuler</Button>
      </Form>
    </Container>
  );
};

export default InsertCategorie;
