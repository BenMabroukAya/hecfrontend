import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FilePond, registerPlugin } from 'react-filepond';
import { addproject } from '../../../services/projectservice';
import { fetchscategories } from '../../../services/scategorieservice';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Insertproject({ ajoutproject }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [files, setFiles] = useState([]);
  const [project, setProject] = useState({});
  const [scategories, setScategories] = useState([]);

  const getscategories = async () => {
    try {
      const res = await fetchscategories();
      setScategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getscategories();
  }, []);

  const handleSave = async (e) => {
    try {
      e.preventDefault();
      await addproject(project)
        .then(res => {
          handleClose();
          ajoutproject(res.data);
          vider();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const vider = () => {
    setProject({});
  };

  const serverOptions = () => { 
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'Essat2025');
        data.append('cloud_name', 'debph61bu');
        data.append('publicid', file.name);

        axios.post('https://api.cloudinary.com/v1_1/debph61bu/image/upload', data)
          .then((response) => response.data)
          .then((data) => {
            setProject({...project, photo: data.url});
            load(data);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            error('Upload failed');
            abort();
          });
      },
    };
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleOpen}>Ajouter Projet</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <center><h1>Nouveau Projet</h1></center>
            <Form>
              <Row>
                <Form.Group as={Col} md="12">
                  <Form.Label>Titre</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Titre du projet" 
                    value={project.title}
                    onChange={(e) => setProject({...project, title: e.target.value})}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="12">
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                    as="textarea"
                    rows={3}
                    placeholder="Description du projet" 
                    value={project.description}
                    onChange={(e) => setProject({...project, description: e.target.value})}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="6">
                  <Form.Label>Statut</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Statut" 
                    value={project.status}
                    onChange={(e) => setProject({...project, status: e.target.value})}
                  />
                </Form.Group>
                
                <Form.Group as={Col} md="6">
                  <Form.Label>Image</Form.Label>
                  <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                    <FilePond
                      files={files}
                      acceptedFileTypes="image/*"
                      onupdatefiles={setFiles}
                      allowMultiple={true}
                      server={serverOptions()}
                      name="file"
                    />
                  </div> 
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="12">
                  <Form.Label>Sous-catégorie</Form.Label>
                  <Form.Control 
                    as="select"
                    value={project.scategorieID}
                    onChange={(e) => setProject({...project, scategorieID: e.target.value})}
                  >
                    <option>-- Sélectionner une sous-catégorie --</option>
                    {scategories.map((scat, index) =>
                      <option value={scat._id} key={index}>{scat.nomscategorie}</option>
                    )}
                  </Form.Control> 
                </Form.Group>
              </Row>
            </Form>

            <div style={{ marginTop: '20px' }}>
              <button className="btn btn-success btn-sm" onClick={handleSave}>
                <i className="fa-solid fa-floppy-disk"></i> Enregistrer
              </button>
              &nbsp;
              <button className="btn btn-danger btn-sm" onClick={handleClose}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Annuler
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}


/*import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

import { addproject } from '../../../services/projectservice';
import { fetchscategories } from '../../../services/scategorieservice';

const Insertproject = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState("");
  const [scategorieID, setScategorieID] = useState("");
  const [scategories, setScategories] = useState([]);

  useEffect(() => {
    const GetListCategories = async () => {
      try {
        const res = await fetchscategories ();
        setScategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetListCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === true) {
      try {
        const project = {
          title,
          description,
          status,
          photo,
          scategorieID
        };
        await addproject(project);
        navigate("/Projectsdt");
      } catch (error) {
        console.log(error);
        alert("Erreur ! Insertion non effectuée");
      }
    }
    setValidated(true);
  };

  return (
    <>
      <div className="container w-100 d-flex justify-content-center">
        <div className='mt-5 w-50'>
          <h1 align="center">Ajout Projet</h1>
          <div className='form mt-3'>
            <Form className="border p-3" noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-2">
                <Form.Group as={Col} md="12">
                  <Form.Label>Titre *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Titre du projet"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Saisir le titre du projet
                  </Form.Control.Feedback>
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Saisir la description du projet
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} md="6">
                  <Form.Label>Statut *</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Statut du projet"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Statut incorrect
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="URL de la photo"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12">
                  <Form.Label>Sous-catégorie *</Form.Label>
                  <Form.Control
                    as="select"
                    value={scategorieID}
                    onChange={(e) => setScategorieID(e.target.value)}
                    required
                  >
                    <option value=""></option>
                    {scategories && scategories.map((scat) => (
                      <option key={scat._id} value={scat._id}>
                        {scat.nomscategorie}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Sélectionner une sous-catégorie
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <center>
                <Button type="submit">Enregistrer</Button>
              </center>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Insertproject;




/*import axios from "axios";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from "react-router-dom";


const Insertproject = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [project, setProject] = useState({
    title: "",
    description: "",
    status: "",
    photo: "",
    scategorieID: ""
  });
  const [scategories, setScategories] = useState([]);

  useEffect(() => {
    const fetchScategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/scategories");
        setScategories(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des sous-catégories:", error);
      }
    };
    fetchScategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        await axios.post("http://localhost:3000/api/projects", project);
        navigate("/projects");
      } catch (error) {
        console.error("Erreur lors de l'ajout du projet:", error);
      }
    }
    setValidated(true);
  };

  return (
    <>
      <div className="container w-100 d-flex justify-content-center">
        <div className='mt-5 w-50'>
          <h1 align="center">Ajout Projet</h1>
          <div className='form mt-3'>
            <Form className="border p-3" noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-2">
                <Form.Group as={Col} md="12">
                  <Form.Label>Titre *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="title"
                    placeholder="Titre du projet"
                    value={project.title}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Saisir le titre du projet
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} md="12">
                  <Form.Label>Description *</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Description du projet"
                    value={project.description}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Saisir la description du projet
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} md="6">
                  <Form.Label>Statut *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="status"
                    placeholder="Statut du projet"
                    value={project.status}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Saisir le statut du projet
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="text"
                    name="photo"
                    placeholder="URL de la photo"
                    value={project.photo}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12">
                  <Form.Label>Sous-catégorie *</Form.Label>
                  <Form.Control
                    as="select"
                    name="scategorieID"
                    value={project.scategorieID}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez une sous-catégorie</option>
                    {scategories.map((scategorie) => (
                      <option key={scategorie._id} value={scategorie._id}>
                        {scategorie.nom}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Sélectionnez une sous-catégorie
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <center>
                <Button type="submit" className="me-2">Enregistrer</Button>
                <Link to="/projects">
                  <Button variant="danger">Annuler</Button>
                </Link>
              </center>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Insertproject;












/*import axios from "axios";
import React, { useEffect, useState } from "react";
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
  const [scategories, setScategories] = useState([]);

  // Charger les sous-catégories au montage du composant
  useEffect(() => {
    const fetchScategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/scategories");
        setScategories(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des sous-catégories:", error);
      }
    };
    fetchScategories();
  }, []);

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
                    required
                  >
                    <option value="">Sélectionnez une sous-catégorie</option>
                    {scategories.map((scategorie) => (
                      <option key={scategorie._id} value={scategorie._id}>
                        {scategorie.nom}
                      </option>
                    ))}
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

export default InsertProject;*/