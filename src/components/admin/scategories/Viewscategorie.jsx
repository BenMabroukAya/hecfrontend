import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Card, ListGroup, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Viewscategorie = () => {
    const [scategorie, setScategorie] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [scategories, setScategories] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const loadScategorie = async () => {
            try {
                // Chargement d'une sous-catégorie spécifique si un ID est présent
                if (id) {
                    const result = await axios.get(`http://localhost:3000/api/scategories/${id}`);
                    setScategorie(result.data);
                } else {
                    // Chargement de toutes les sous-catégories si aucun ID n'est spécifié
                    const result = await axios.get("http://localhost:3000/api/scategories/");
                    setScategories(result.data);
                }
            } catch (err) {
                setError(err.message);
                console.error("Erreur de chargement:", err);
            } finally {
                setLoading(false);
            }
        };
        loadScategorie();
    }, [id]);

    if (loading) return (
        <div className="text-center mt-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Chargement...</span>
            </Spinner>
        </div>
    );

    if (error) return (
        <div className="container mt-5">
            <Alert variant="danger">
                Erreur: {error}
            </Alert>
        </div>
    );

    return (
        <div className="container mt-5">
            {id ? (
                // Affichage d'une sous-catégorie spécifique
                <Card>
                    <Card.Header>Sous-catégorie</Card.Header>
                    <Card.Body>
                        <Card.Title>{scategorie.nomScategorie}</Card.Title>
                        <Card.Text>
                            ID: {scategorie._id}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                // Affichage de la liste des sous-catégories
                <>
                    <h2 className="mb-4">Liste des Sous-catégories</h2>
                    <ListGroup>
                        {scategories.map((scat) => (
                            <ListGroup.Item key={scat._id}>
                                {scat.nomScategorie}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </>
            )}
        </div>
    );
};

export default Viewscategorie;