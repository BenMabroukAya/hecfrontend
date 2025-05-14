import axios from "axios";
import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate, useParams } from "react-router-dom";

const Editproject = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [scategories, setScategories] = useState([]);
  const [project, setProject] = useState({
    title: "",
    photo: "",
    description: "",
    status: "",
    scategorieID: ""
  });

  useEffect(() => {
    getscategories();
    loadproject();
  }, []);

  const getscategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/scategories");
      setScategories(res.data);
    } catch (error) {
      console.log("Erreur chargement sous-catégories :", error);
    }
  };

  const loadproject = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/projects/${id}`);
      setProject(result.data);
    } catch (error) {
      console.log("Erreur chargement projet :", error);
    }
  };

  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/projects/${id}`, project);
      navigate("/projects");
    } catch (error) {
      console.log("Erreur mise à jour projet :", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h4 align="center">Modifier le Projet</h4>

          <div className='form mt-3'>
            <Form className="border p-3" onSubmit={onSubmit}>
              <Row className="mb-2">
                <Form.Group as={Col} md="6">
                  <Form.Label>Titre *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Titre"
                    name="title"
                    value={project.title}
                    onChange={onInputChange}
                  />
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="URL de l'image"
                    name="photo"
                    value={project.photo}
                    onChange={onInputChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col} md="12">
                  <Form.Label>Description *</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    placeholder="Description du projet"
                    name="description"
                    value={project.description}
                    onChange={onInputChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col} md="6">
                  <Form.Label>Status *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Statut (ex: Terminé, En cours)"
                    name="status"
                    value={project.status}
                    onChange={onInputChange}
                  />
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <Form.Label>Catégorie *</Form.Label>
                  <Form.Control
                    as="select"
                    name="scategorieID"
                    required
                    value={project.scategorieID}
                    onChange={onInputChange}
                  >
                    <option value="">-- Sélectionner une catégorie --</option>
                    {scategories.map((scat) => (
                      <option key={scat._id} value={scat._id}>
                        {scat.nomscategorie}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Row>

              <button type="submit" className="btn btn-outline-primary mt-3">
                Enregistrer
              </button>
              <Link className="btn btn-outline-danger mx-2 mt-3" to="/projects">
                Annuler
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editproject;







/*import axios from "axios";
import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate, useParams } from "react-router-dom";

const Editproject = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [scategories, setScategories] = useState([]);
  const [project, setProject] = useState({
    title: "",
    photo: "",
    description: "",
    status: "",
    scategorieID: ""
  });

  useEffect(() => {
    getscategories();
    loadproject();
  }, []);

  const getscategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/scategories");
      setScategories(res.data);
    } catch (error) {
      console.log("Erreur lors du chargement des sous-catégories :", error);
    }
  };

  const loadproject = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/projects/${id}`);
      setProject(result.data);
    } catch (error) {
      console.log("Erreur lors du chargement du projet :", error);
    }
  };

  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/projects/${id}`, project);
      navigate("/projects");
    } catch (error) {
      console.log("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h4 align="center">Modifier le projet</h4>
          <div className='form mt-3'>
            <Form className="border p-3" onSubmit={onSubmit}>
              <Row className="mb-2">
                <Form.Group as={Col} md="6">
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={project.title}
                    onChange={onInputChange}
                  />
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="URL de l'image"
                    name="photo"
                    value={project.photo}
                    onChange={onInputChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col} md="12">
                  <Form.Label>Description *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={project.description}
                    onChange={onInputChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col} md="6">
                  <Form.Label>Status *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Status"
                    name="status"
                    value={project.status}
                    onChange={onInputChange}
                  />
                </Form.Group>

                <Form.Group as={Col} md="12">
                  <Form.Label>Catégorie *</Form.Label>
                  <Form.Control
                    as="select"
                    name="scategorieID"
                    required
                    value={project.scategorieID}
                    onChange={onInputChange}
                  >
                    <option value="">-- Sélectionner une catégorie --</option>
                    {scategories.map((scat) => (
                      <option key={scat._id} value={scat._id}>
                        {scat.nomscategorie}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Row>

              <button type="submit" className="btn btn-outline-primary mt-3">
                Enregistrer
              </button>
              <Link className="btn btn-outline-danger mx-2 mt-3" to="/projects">
                Annuler
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editproject;
*/