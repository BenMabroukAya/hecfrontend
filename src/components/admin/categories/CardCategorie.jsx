import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const CardCategorie = ({ categorie }) => {
  return (
    <div className="container mt-4">
      <Card className="shadow border-0 rounded-3">
        <Card.Body>
          <Card.Title>Date de la catégorie</Card.Title>
          <Card.Text style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {categorie.Datecategorie}
          </Card.Text>

          <Link className="btn btn-outline-primary mt-3" to="/categoriesCard">
            ⬅️ Retour
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardCategorie;
