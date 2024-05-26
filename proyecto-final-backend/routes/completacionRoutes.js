const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Ruta para agregar completaciones
router.post('/', async (req, res) => {
  const { fechaInicioCompletacion, fechaFinCompletacion, totalCompletacion, estadoCompletacion, idUsuarioFK, idJuegoFK } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO completacion (fechaInicioCompletacion, fechaFinCompletacion, totalCompletacion, estadoCompletacion, idUsuarioFK, idJuegoFK) VALUES (?, ?, ?, ?, ?, ?)',
      [fechaInicioCompletacion, fechaFinCompletacion, totalCompletacion, estadoCompletacion, idUsuarioFK, idJuegoFK]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener estadísticas de completaciones
router.get('/estadisticas/:idJuego', async (req, res) => {
  const { idJuego } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT 
        AVG(totalCompletacion) AS duracionMedia, 
        SUM(CASE WHEN estadoCompletacion = 'Comenzado' THEN 1 ELSE 0 END) AS usuariosComenzados,
        SUM(CASE WHEN estadoCompletacion = 'Completado' THEN 1 ELSE 0 END) AS usuariosCompletados,
        SUM(CASE WHEN estadoCompletacion = 'Rejugar' THEN 1 ELSE 0 END) AS usuariosRejugados,
        SUM(CASE WHEN estadoCompletacion = 'Abandonado' THEN 1 ELSE 0 END) AS usuariosAbandonados
      FROM completacion
      WHERE idJuegoFK = ?`,
      [idJuego]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
