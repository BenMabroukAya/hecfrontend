import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';

const Editmessages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messageData, setMessageData] = useState({
    email: '',
    message: ''
  });

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/messages/${id}`);
        setMessageData(res.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du message:', error);
      }
    };
    fetchMessage();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessageData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/messages/${id}`, messageData);
      navigate('/messages');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  return (
    <div className="container mt-5 w-50">
      <h2 className="text-center">Modifier le message</h2>
      <Form onSubmit={handleSubmit} className="border p-3">
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={messageData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={messageData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button type="submit" className="me-2">Mettre à jour</Button>
          <Button variant="secondary" onClick={() => navigate('/messages')}>Annuler</Button>
        </div>
      </Form>
    </div>
  );
};

export default Editmessages;
