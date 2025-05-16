import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container, Grid,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

const ListProjectsClient = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const getProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/api/projects?page=${currentPage}&limit=${limit}`);
      setProjects(res.data.projects || res.data); // pour compatibilité avec les deux formats
      setTotalPages(Math.ceil((res.data.tot || res.data.length) / limit));
    } catch (err) {
      setError('Erreur lors du chargement des projets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, [currentPage]);

  if (loading) return <CircularProgress sx={{ display: 'block', m: '2rem auto' }} />;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Nos projets</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/simulator')}>
          Simulateur de coût
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate(`/projects/details/${project._id}`)}>
              <CardMedia component="img" height="160" image={project.photo} alt={project.title} />
              <CardContent>
                <Typography variant="h6">{project.title}</Typography>
                <Typography variant="body2" sx={{ my: 1 }}>{project.description.slice(0, 100)}...</Typography>
                <Chip label={project.status} color={project.status === 'Terminé' ? 'success' : 'primary'} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            handlePrevPage={() => setCurrentPage(p => Math.max(1, p - 1))}
            handleNextPage={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            handlePageChange={(page) => setCurrentPage(page)}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Box>
      )}
    </Container>
  );
};

export default ListProjectsClient;



/*import VisibilityIcon from '@mui/icons-material/Visibility'; // 👁️ Icône vue
import { IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error);
    }
  };

  /*const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/projects/${id}`);
      const newProjects = projects.filter((item) => item._id !== id);
      setProjects(newProjects);
    } catch (error) {
      console.error("Erreur lors de la suppression du projet:", error);
    }
  };*/
/*
  const columns = [
    {
      label: "Titre",
      name: "title"
    },
    {
      label: "Image",
      name: "photo",
      options: {
        customBodyRender: (value) => (
          <img
            src={value}
            alt="Project"
            width={80}
            height={80}
            style={{ borderRadius: '5%' }}
          />
        )
      }
    },
    {
      label: "Description",
      name: "description"
    },
    {
      label: "Statut",
      name: "status"
    },
    {
      name: "_id",
      label: "Actions",
      options: {
        customBodyRender: (value) => (
          <div>
            {/* 👁️ Voir projet }
            <IconButton component={Link} to={`/projects/view/${value}`}>
              <VisibilityIcon color="action" />
            </IconButton>

            {/* ✏️ Modifier }
            {/*<IconButton component={Link} to={`/projects/edit/${value}`}>
              <EditIcon color="primary" />
            </IconButton>

            {/* 🗑️ Supprimer }
            {/*<IconButton onClick={() => {
              if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
                handleDelete(value);
              }
            }}>
              <DeleteIcon sx={{ color: pink[500] }} />
            </IconButton>}
          </div>
        )
      }
    }
  ];

  const theme = createTheme();

  return (
    <div>
      {/*<div style={{ padding: 5, margin: 5 }}>
        <Button
          color="success"
          startIcon={<AddCircleIcon />}
          variant="contained"
          component={Link}
          to="/projects/add"
          style={{ textDecoration: "none", color: "white" }}
        >
          Ajouter Projet
        </Button>
      </div>*}

      {projects.length > 0 ? (
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title="Liste des projets"
            data={projects}
            columns={columns}
          />
        </ThemeProvider>
      ) : null}
    </div>
  );
};

export default ListProjects;




/*import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton } from '@mui/material';
import { pink } from '@mui/material/colors';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/projects/${id}`);
      const newProjects = projects.filter((item) => item._id !== id);
      setProjects(newProjects);
    } catch (error) {
      console.error("Erreur lors de la suppression du projet:", error);
    }
  };

  const columns = [
    {
      label: "Titre",
      name: "title"
    },
    {
      label: "Image",
      name: "photo",
      options: {
        customBodyRender: (value) => (
          <img
            src={value}
            alt="Project"
            width={80}
            height={80}
            style={{ borderRadius: '5%' }}
          />
        )
      }
    },
    {
      label: "Description",
      name: "description"
    },
    {
      label: "Statut",
      name: "status"
    },
    {
      name: "_id",
      label: "Actions",
      options: {
        customBodyRender: (value) => (
          <div>
            <IconButton component={Link} to={`/projects/view/${value}`}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => {
              if(window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
                handleDelete(value);
              }
            }}>
              <DeleteIcon sx={{ color: pink[500] }} />
            </IconButton>
          </div>
        )
      }
    }
  ];

  const theme = createTheme();

  return (
    <div>
      <div style={{ padding: 5, margin: 5 }}>
        <Button
          color="success"
          startIcon={<AddCircleIcon />}
          variant="contained"
          component={Link}
          to="/projects/add"
          style={{ textDecoration: "none", color: "white" }}
        >
          Ajouter Projet
        </Button>
      </div>
      
      {projects.length > 0 ? (
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title="Liste des projets"
            data={projects}
            columns={columns}
          />
        </ThemeProvider>
      ) : null}
    </div>
  );
};

export default ListProjects;*/