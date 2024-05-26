const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const bcrypt = require('bcrypt');

// Registro
router.post('/register', async (req, res) => {
  const { nombreUsuario, emailUsuario, claveUsuario } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(claveUsuario, 10);
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombreUsuario, emailUsuario, claveUsuario) VALUES (?, ?, ?)',
      [nombreUsuario, emailUsuario, hashedPassword]
    );
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { emailUsuario, claveUsuario } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE emailUsuario = ?', [emailUsuario]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(claveUsuario, user.claveUsuario);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    res.json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
