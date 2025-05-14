import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

const Insertmessage = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [messageData, setMessageData] = useState({
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessageData(prev => ({
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
        await axios.post('http://localhost:3000/api/messages', messageData);
        navigate('/messages'); // à adapter selon ta route
      } catch (error) {
        console.error('Erreur lors de l\'ajout du message:', error);
      }
    }

    setValidated(true);
  };

  return (
    <div className="container w-100 d-flex justify-content-center">
      <div className='mt-5 w-50'>
        <h1 align="center">Nouveau Message</h1>
        <div className='form mt-3'>
          <Form className="border p-3" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Entrez votre email"
                  name="email"
                  value={messageData.email}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Adresse email obligatoire
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="12">
                <Form.Label>Message *</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={4}
                  placeholder="Votre message"
                  name="message"
                  value={messageData.message}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Le message est requis
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <center>
              <Button type="submit" className="me-2">Envoyer</Button>
              <Button variant="danger" type="reset" onClick={() => setMessageData({ email: '', message: '' })}>
                Annuler
              </Button>
            </center>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Insertmessage;
