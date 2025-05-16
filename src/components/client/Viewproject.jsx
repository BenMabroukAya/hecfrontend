import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardProject from "./Cardproject";

const Viewproject = () => {
  const [project, setProject] = useState({
    title: "",
    photo: "",
    description: "",
    status: "",
    scategorieID: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();

  useEffect(() => {
    loadProject();
  }, [id]); 

  const loadProject = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`http://localhost:3000/api/projects/${id}`);
      setProject(result.data);
    } catch (err) {
      setError(err.message);
      console.error("Error loading project:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Chargement en cours...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5">
        Erreur lors du chargement du projet: {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <CardProject project={project} />
        </div>
      </div>
    </div>
  );
};

export default Viewproject;