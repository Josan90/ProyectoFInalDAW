const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./config/database');

// Habilita CORS
app.use(cors());
app.use(express.json());

const usersRoutes = require('./routes/usersRoutes');
const completacionRoutes = require('./routes/completacionRoutes');
const juegosRoutes = require('./routes/juegosRoutes');
const authRoutes = require('./routes/authRoutes');
const comentariosRoutes = require('./routes/comentariosRoutes');

app.use('/api/users', usersRoutes);
app.use('/api/completacion', completacionRoutes);
app.use('/api/juegos', juegosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comentarios', comentariosRoutes);

// Exportar la aplicacion
module.exports = app;

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
