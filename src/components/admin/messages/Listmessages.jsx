import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Listmessages = () => {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/messages');
      setMessages(res.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/messages/${id}`);
      setMessages(messages.filter(msg => msg._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Liste des messages</h2>
      <Link to="/messages/add" className="btn btn-success mb-3">Nouveau message</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(msg => (
            <tr key={msg._id}>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
              <td>
                <Link to={`/message/view/${msg._id}`} className="btn btn-info me-2">Détails</Link>
                <Link to={`/message/edit/${msg._id}`} className="btn btn-primary me-2">Modifier</Link>
                <Button variant="danger" onClick={() => handleDelete(msg._id)}>Supprimer</Button>
                </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Listmessages;
