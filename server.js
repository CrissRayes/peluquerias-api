require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const peluqueriaRoutes = require('./routes/peluqueriaRoutes');
const servicioRoutes = require('./routes/servicioRoutes');
const peluqueroRoutes = require('./routes/peluqueroRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');
const citaRoutes = require('./routes/citaRoutes');
const disponibilidadRoutes = require('./routes/disponibilidadRoutes');
const favoritoRoutes = require('./routes/favoritoRoutes');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/', userRoutes);
app.use('/', peluqueriaRoutes);
app.use('/', servicioRoutes);
app.use('/', peluqueroRoutes);
app.use('/', comentarioRoutes);
app.use('/', citaRoutes);
app.use('/', disponibilidadRoutes);
app.use('/', favoritoRoutes);

// Server
const port = process.env.PORT || 3001;
app.listen(port, console.log(`Server is running on port ${port}`));

module.exports = app;
