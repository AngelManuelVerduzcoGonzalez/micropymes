const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const { sequelize } = require('./lib/db.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors()); // Habilita CORS para todas las rutas

const router = require('./routes/index.js');
app.use('/api', router);

// Sincronizar la base de datos y lanzar el servidor
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos y tablas sincronizadas');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});