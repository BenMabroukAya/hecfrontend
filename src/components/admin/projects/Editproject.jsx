import axios from "axios";
import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate, useParams } from "react-router-dom";

const Editproject = () => {
  let navigate = useNavigate();
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
      console.log(error);
    }
  };

  const loadproject = async () => {
    const result = await axios.get(`http://localhost:3000/api/projects/${id}`);
    setProject(result.data);
  };

  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/projects/${id}`, project);
    navigate("/projects");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h4 align="center">Ajout Project</h4>
          <div className='form mt-3'>
            <Form className="border p-3" onSubmit={(e) => onSubmit(e)}>
              <Row className="mb-2">
                <Form.Group as={Col} md="6">
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={project.title}
                    onChange={(e) => onInputChange(e)}
                  />
                </Form.Group>
                
                <Form.Group as={Col} md="6">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Photo"
                    value={project.photo}
                    name="photo"
                    onChange={(e) => onInputChange(e)}
                  />
                </Form.Group>
                
                <Form.Group as={Col} md="6">
                  <Form.Label>Description *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={project.description}
                    onChange={(e) => onInputChange(e)}
                  />
                </Form.Group>
              </Row>
              
              <Row className="mb-2">
                <Form.Group className="col-md-6">
                  <Form.Label>Status *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Status"
                    name="status"
                    value={project.status}
                    onChange={(e) => onInputChange(e)}
                  />
                </Form.Group>
                
                <Form.Group as={Col} md="12">
                  <Form.Label>Catégorie</Form.Label>
                  <Form.Control
                    as="select"
                    type="select"
                    name="scategorieID"
                    value={project.scategorieID}
                    onChange={(e) => onInputChange(e)}
                  >
                    {scategories.map((scat, index) => (
                      <option value={scat._id}>{scat.nomscategorie}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Row>
              
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/articles">
                Cancel
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editproject;