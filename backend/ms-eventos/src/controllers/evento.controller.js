const Pelicula = require('../models/pelicula.model');

async function crearPelicula(req, res) {
  try {
    const { titulo, genero, duracion, clasificacion } = req.body;
    const nueva = await Pelicula.create({
      titulo,
      genero,
      duracion,
      clasificacion
    });
    res.status(201).json(nueva);
  } catch (err) {
    console.error('Error crearPelicula:', err);
    res.status(500).json({ error: 'No se pudo crear la película' });
  }
}

async function listarPeliculas(req, res) {
  try {
    const lista = await Pelicula.findAll();
    res.json(lista);
  } catch (err) {
    console.error('Error listarPeliculas:', err);
    res.status(500).json({ error: 'No se pudo listar películas' });
  }
}

module.exports = { crearPelicula, listarPeliculas };
