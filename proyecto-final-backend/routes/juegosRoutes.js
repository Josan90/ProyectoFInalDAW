const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Ruta para obtener todos los juegos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM juegos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un juego específico por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM juegos WHERE idJuego = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Juego no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
