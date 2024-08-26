const express = require('express');
const router = express.Router();
const pool = require('../config/database');

//Ruta para obtener un usuario por su id
router.get('/:idUsuario', async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE idUsuario = ?', [idUsuario]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para eliminar un usuario y sus datos relacionados
router.delete('/:idUsuario', async (req, res) => {
  const { idUsuario } = req.params;
  const connection = await pool.getConnection(); // Pool de conexiones
  try {
    await connection.beginTransaction();

    console.log(`Eliminando datos de completacion para el usuario ${idUsuario}`);
    // ELiminar de completacion
    await connection.query('DELETE FROM completacion WHERE idUsuarioFK = ?', [idUsuario]);

    console.log(`Eliminando usuario ${idUsuario}`);
    // Eliminar usuario
    const [result] = await connection.query('DELETE FROM usuarios WHERE idUsuario = ?', [idUsuario]);

    if (result.affectedRows === 0) {
      throw new Error('Usuario no encontrado');
    }

    await connection.commit();

    console.log(`Usuario ${idUsuario} eliminado correctamente`);
    res.status(204).end();
  } catch (err) {
    await connection.rollback(); // Caso de error
    console.error(`Error al eliminar usuario ${idUsuario}:`, err.message);
    res.status(500).json({ error: err.message });
  } finally {
    connection.release(); // Libera conexion?
  }
});

// Ruta para obtener estadísticas y los últimos juegos añadidoso
router.get('/estadisticas/:idUsuario', async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const [estadisticas] = await pool.query(
      `SELECT 
        SUM(CASE WHEN estadoCompletacion = 'Completado' THEN 1 ELSE 0 END) AS completados,
        SUM(CASE WHEN estadoCompletacion = 'Rejugar' THEN 1 ELSE 0 END) AS rejugados,
        SUM(CASE WHEN estadoCompletacion = 'Comenzado' THEN 1 ELSE 0 END) AS comenzados,
        SUM(CASE WHEN estadoCompletacion = 'Abandonado' THEN 1 ELSE 0 END) AS abandonados
      FROM completacion
      WHERE idUsuarioFK = ?`,
      [idUsuario]
    );

    const [ultimosJuegos] = await pool.query(
      `SELECT c.*, j.nombreJuego, j.imagenJuego
      FROM completacion c
      JOIN juegos j ON c.idJuegoFK = j.idJuego
      WHERE c.idUsuarioFK = ?
      ORDER BY c.fechaFinCompletacion DESC
      LIMIT 10`,
      [idUsuario]
    );

    res.json({ estadisticas: estadisticas[0], ultimosJuegos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un usuario NO FUNCIONA CORRECTAMENTE
/*
router.put('/:idUsuario', async (req, res) => {
  const { idUsuario } = req.params;
  const { nombreUsuario, emailUsuario, claveUsuario } = req.body;
  try {
    await pool.query(
      'UPDATE usuarios SET nombreUsuario = ?, emailUsuario = ?, claveUsuario = ? WHERE idUsuario = ?',
      [nombreUsuario, emailUsuario, claveUsuario, idUsuario]
    );
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
*/

module.exports = router;
