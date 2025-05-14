import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const Viewmessage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMessage = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/messages/${id}`);
      setMessage(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération du message:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!message) {
    return <p className="text-center mt-5 text-danger">Message non trouvé.</p>;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card className="w-50 p-4 shadow">
        <Card.Title className="mb-4 text-center">Détails du message</Card.Title>
        <Card.Body>
          <p><strong>Email :</strong> {message.email}</p>
          <p><strong>Message :</strong> {message.message}</p>
        </Card.Body>
        <div className="text-center mt-4">
          <Button variant="secondary" onClick={() => navigate('/messages')}>Retour à la liste</Button>
        </div>
      </Card>
    </div>
  );
};

export default Viewmessage;
