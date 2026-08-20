const express = require('express');
const tareasService = require('./tareas');

function crearApp() {
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({
      mensaje: 'API de gestion de tareas - Extraclase 2, CI/CD con GitHub Actions',
      autor: 'Estudiante de Programacion IV, UNA',
    });
  });

  app.get('/api/tareas', (req, res) => {
    res.json({
      tareas: tareasService.obtenerTareas(),
      porcentajeCompletado: tareasService.calcularPorcentajeCompletado(),
    });
  });

  app.get('/api/tareas/:id', (req, res) => {
    const id = Number(req.params.id);
    const tarea = tareasService.obtenerTareaPorId(id);

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    return res.json(tarea);
  });

  app.post('/api/tareas', (req, res) => {
    try {
      const nuevaTarea = tareasService.crearTarea(req.body.titulo);
      res.status(201).json(nuevaTarea);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put('/api/tareas/:id', (req, res) => {
    const id = Number(req.params.id);
    const tareaActualizada = tareasService.actualizarTarea(id, req.body);

    if (!tareaActualizada) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    return res.json(tareaActualizada);
  });

  app.delete('/api/tareas/:id', (req, res) => {
    const id = Number(req.params.id);
    const eliminada = tareasService.eliminarTarea(id);

    if (!eliminada) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    return res.status(204).send();
  });

  return app;
}

module.exports = crearApp;
