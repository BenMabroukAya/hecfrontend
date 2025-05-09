import axios from "axios";
import React, { useEffect, useState } from "react";
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
      loadProjects();
    } catch (error) {
      console.error("Erreur lors de la suppression du projet:", error);
    }
  };

  return (
    <div className="container">
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            <Link className="btn btn-outline-light" to="/projects/add">
              Ajouter Projet
            </Link>
          </div>
        </nav>
      </div>
      
      <div className="py-4">
        <table className="table border shadow">
          <thead className="table-dark">
            <tr>
              <th scope="col">Titre</th>
              <th scope="col">Image</th>
              <th scope="col">Description</th>
              <th scope="col">Statut</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.title}</td>
                <td>
                  <img 
                    src={project.photo} 
                    alt={project.title} 
                    width={80} 
                    height={80} 
                    className="img-thumbnail"
                  />
                </td>
                <td>{project.description}</td>
                <td>{project.status}</td>
                <td>
                  <div className="d-flex">
                    <Link
                      className="btn btn-primary mx-1"
                      to={`/projects/view/${project._id}`}
                    >
                      Voir
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-1"
                      to={`/projects/edit/${project._id}`}
                    >
                      Modifier
                    </Link>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => {
                        if(window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
                          handleDelete(project._id);
                        }
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProjects;