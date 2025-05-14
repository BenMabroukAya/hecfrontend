import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/categories");
      setCategories(result.data);
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
    }
  };

  const deleteCategorie = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      await axios.delete(`http://localhost:3000/api/categories/${id}`);
      loadCategories();
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Liste des Catégories</h2>
      <Link className="btn btn-primary mb-3" to="/categories/add">➕ Ajouter Catégorie</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((categorie, index) => (
            <tr key={categorie._id}>
              <td>{index + 1}</td>
              <td>{categorie.Datecategorie}</td>
              <td>
                <Link className="btn btn-warning btn-sm me-2" to={`/categories/edit/${categorie._id}`}>✏️ Modifier</Link>
                <Button variant="danger" size="sm" onClick={() => deleteCategorie(categorie._id)}>🗑️ Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListCategories;
