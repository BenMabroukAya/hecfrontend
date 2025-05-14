import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const Cardproject = ({ project }) => {
  return (
    <div className="container mt-1">
      <div className="row justify-content-center">
        <div className="col-md-80">
          <h2 className="text-center mb-4"> Détails du Projet</h2>

          <Card className="shadow-lg border-0 rounded-4">
            {project.photo && (
              <Card.Img
                variant="top"
                src={project.photo}
                alt="Photo du projet"
                style={{
                  height: "550px",
                  objectFit: "cover",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem"
                }}
              />
            )}

            <Card.Body style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
              <Card.Title className="mb-3">
                <strong style={{ fontSize: "1.3rem" }}> Titre :</strong> {project.title}
              </Card.Title>

              <Card.Text>
                <strong>Description :</strong><br />
                <span className="text-muted">{project.description}</span>
              </Card.Text>

              <Card.Text>
                <strong>Statut :</strong> <span className="badge bg-success">{project.status} </span>
              </Card.Text>

              <Link className="btn btn-outline-primary mt-3" to="/projects">
                ⬅️ Retour
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cardproject;
