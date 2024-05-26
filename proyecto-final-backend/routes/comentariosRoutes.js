const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Ruta para agregar comentarios
router.post('/', async (req, res) => {
  const { idUsuarioFK, idJuegoFK, textoComentario, valoracionComentario } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO comentarios (textoComentario, valoracionComentario, fechaComentario, idUsuarioFK, idJuegoFK) VALUES (?, ?, NOW(), ?, ?)',
      [textoComentario, valoracionComentario, idUsuarioFK, idJuegoFK]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener comentarios por juego
router.get('/juego/:idJuego', async (req, res) => {
  const { idJuego } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT comentarios.*, usuarios.nombreUsuario FROM comentarios JOIN usuarios ON comentarios.idUsuarioFK = usuarios.idUsuario WHERE idJuegoFK = ? ORDER BY fechaComentario DESC',
      [idJuego]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
