import { Box, Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const buildingTypes = [
  { label: "Appartement", multiplier: 1.2 },
  { label: "Villa", multiplier: 1.5 },
  { label: "Bureau", multiplier: 1.8 },
];

const Simulator = () => {
  const [surface, setSurface] = useState('');
  const [type, setType] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (!surface || !type) return;
    const selected = buildingTypes.find(t => t.label === type);
    const baseCost = 100; // coût au m² de base
    const estimated = surface * baseCost * selected.multiplier;
    setResult(estimated);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>Simulateur de coût électrique</Typography>

      <TextField
        label="Surface (m²)"
        type="number"
        fullWidth
        value={surface}
        onChange={(e) => setSurface(e.target.value)}
        sx={{ my: 2 }}
      />

      <TextField
        label="Type de bâtiment"
        select
        fullWidth
        value={type}
        onChange={(e) => setType(e.target.value)}
        sx={{ mb: 2 }}
      >
        {buildingTypes.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" color="primary" onClick={handleCalculate}>
        Estimer le coût
      </Button>

      {result && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Estimation : {result.toFixed(2)} TND</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default Simulator;
