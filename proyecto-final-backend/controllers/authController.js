const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nombreUsuario, emailUsuario, claveUsuario } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(claveUsuario, 10);
    await pool.query('INSERT INTO usuarios (nombreUsuario, emailUsuario, claveUsuario) VALUES (?, ?, ?)', 
      [nombreUsuario, emailUsuario, hashedPassword]);
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { emailUsuario, claveUsuario } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE emailUsuario = ?', [emailUsuario]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    const user = rows[0];
    const isMatch = await bcrypt.compare(claveUsuario, user.claveUsuario);
    if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ idUsuario: user.idUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
