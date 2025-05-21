import {
    Alert,
    Button,
    MenuItem,
    Paper,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

const AppointmentForm = () => {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    date: '',
    time: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, contact, date, time } = form;

    if (!name || !contact || !date || !time) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    const fullMessage =
      `Nouvelle demande de rendez-vous :\n\n` +
      `👤 Nom : ${name}\n📅 Date : ${date}\n🕒 Heure : ${time}`;

    try {
      await axios.post('http://localhost:3000/api/messages', {
        email: contact,       // email ou numéro
        message: fullMessage  // contenu structuré
      });
      setSuccess(true);
      setForm({ name: '', contact: '', date: '', time: '' });
    } catch (err) {
      setError("Erreur lors de l'envoi du message.");
      console.error(err);
    }
  };

  return (
    <Paper sx={{ maxWidth: 600, margin: 'auto', padding: 4 }}>
      <Typography variant="h5" gutterBottom>Prendre un rendez-vous</Typography>

      <TextField
        fullWidth label="Nom" name="name"
        value={form.name} onChange={handleChange} sx={{ my: 2 }}
      />

      <TextField
        fullWidth label="Email ou téléphone" name="contact"
        value={form.contact} onChange={handleChange} sx={{ my: 2 }}
        placeholder="ex: user@gmail.com ou 20 000 000"
      />

      <TextField
        fullWidth type="date" name="date"
        value={form.date} onChange={handleChange} sx={{ my: 2 }}
      />

      <TextField
        select fullWidth label="Heure" name="time"
        value={form.time} onChange={handleChange} sx={{ my: 2 }}
      >
        {timeSlots.map((slot) => (
          <MenuItem key={slot} value={slot}>{slot}</MenuItem>
        ))}
      </TextField>

      <Button variant="contained" onClick={handleSubmit}>
        Envoyer la demande
      </Button>

      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Demande envoyée avec succès.</Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Paper>
  );
};

export default AppointmentForm;
