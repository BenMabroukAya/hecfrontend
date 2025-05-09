import axios from "axios";
import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from "react-router-dom";

const InsertProject = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    title: "",
    description: "",
    status: "",
    photo: "",
    scategorieID: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/projects", project);
      navigate("/projects");
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h4 className="text-center">Ajout Projet</h4>
          <div className='form mt-3'>
            <Form className="border p-3" onSubmit={onSubmit}>
              <Row className="mb-2">
                <Form.Group as={Col} md="6">
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="title"
                    placeholder="Titre du projet"
                    value={project.title}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={project.description}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} md="6">
                  <Form.Label>Statut</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="status"
                    placeholder="Statut"
                    value={project.status}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="text"
                    name="photo"
                    placeholder="Photo du projet"
                    value={project.photo}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="12">
                  <Form.Label>Sous-catégorie</Form.Label>
                  <Form.Control
                    as="select"
                    name="scategorieID"
                    value={project.scategorieID}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionnez une sous-catégorie</option>
                    {/* Ajoutez ici les options des sous-catégories */}
                  </Form.Control>
                </Form.Group>
              </Row>
              <button type="submit" className="btn btn-outline-primary">
                Enregistrer
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/projects">
                Annuler
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertProject;