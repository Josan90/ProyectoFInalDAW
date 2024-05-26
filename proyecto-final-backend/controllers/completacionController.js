const pool = require('../config/database');

exports.addCompletacion = async (req, res) => {
  const { fechaInicioCompletacion, fechaFinCompletacion, estadoCompletacion, totalCompletacion, idUsuarioFK, idJuegoFK } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO completacion (fechaInicioCompletacion, fechaFinCompletacion, estadoCompletacion, totalCompletacion, idUsuarioFK, idJuegoFK) VALUES (?, ?, ?, ?, ?, ?)',
      [fechaInicioCompletacion, fechaFinCompletacion, estadoCompletacion, totalCompletacion, idUsuarioFK, idJuegoFK]
    );
    res.status(201).json({ id: result.insertId, fechaInicioCompletacion, fechaFinCompletacion, estadoCompletacion, totalCompletacion, idUsuarioFK, idJuegoFK });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCompletacionesByUser = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM completacion WHERE idUsuarioFK = ?', [idUsuario]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
