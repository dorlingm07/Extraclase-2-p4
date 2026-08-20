/**
 * Modulo de logica de negocio para la gestion de tareas.
 * Se mantiene separado de las rutas de Express para poder probarlo
 * con pruebas unitarias puras, sin necesidad de levantar el servidor.
 */

let tareas = [];
let siguienteId = 1;

function reiniciarTareas() {
  tareas = [];
  siguienteId = 1;
}

function obtenerTareas() {
  return tareas;
}

function obtenerTareaPorId(id) {
  return tareas.find((tarea) => tarea.id === id);
}

function crearTarea(titulo) {
  if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
    throw new Error('El titulo de la tarea es obligatorio');
  }

  const nuevaTarea = {
    id: siguienteId,
    titulo: titulo.trim(),
    completada: false,
    creadaEn: new Date().toISOString(),
  };

  tareas.push(nuevaTarea);
  siguienteId += 1;

  return nuevaTarea;
}

function actualizarTarea(id, cambios) {
  const tarea = obtenerTareaPorId(id);

  if (!tarea) {
    return null;
  }

  if (typeof cambios.titulo === 'string' && cambios.titulo.trim().length > 0) {
    tarea.titulo = cambios.titulo.trim();
  }

  if (typeof cambios.completada === 'boolean') {
    tarea.completada = cambios.completada;
  }

  return tarea;
}

function eliminarTarea(id) {
  const indice = tareas.findIndex((tarea) => tarea.id === id);

  if (indice === -1) {
    return false;
  }

  tareas.splice(indice, 1);
  return true;
}

function calcularPorcentajeCompletado() {
  if (tareas.length === 0) {
    return 0;
  }

  const completadas = tareas.filter((tarea) => tarea.completada).length;
  return Math.round((completadas / tareas.length) * 100);
}

module.exports = {
  reiniciarTareas,
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
  calcularPorcentajeCompletado,
};
