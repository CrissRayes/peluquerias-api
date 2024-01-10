const userQueries = require('./userQueries');
const peluqueriaQueries = require('./peluqueriaQueries');
const servicioQueries = require('./servicioQueries');
const peluqueroQueries = require('./peluqueroQueries');
const comentarioQueries = require('./comentarioQueries');
const citaQueries = require('./citaQueries');
const disponibilidadQueries = require('./disponibilidadQueries');

module.exports = {
  ...userQueries,
  ...peluqueriaQueries,
  ...servicioQueries,
  ...peluqueroQueries,
  ...comentarioQueries,
  ...citaQueries,
  ...disponibilidadQueries,
};
