import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility'; // 👁️ Icône vue
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
            {/* 👁️ Voir projet */}
            <IconButton component={Link} to={`/projects/view/${value}`}>
              <VisibilityIcon color="action" />
            </IconButton>

            {/* ✏️ Modifier */}
            <IconButton component={Link} to={`/projects/edit/${value}`}>
              <EditIcon color="primary" />
            </IconButton>

            {/* 🗑️ Supprimer */}
            <IconButton onClick={() => {
              if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
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