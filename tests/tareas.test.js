const tareasService = require('../src/tareas');

describe('Servicio de tareas (logica de negocio)', () => {
  beforeEach(() => {
    tareasService.reiniciarTareas();
  });

  test('crea una tarea nueva con los datos correctos', () => {
    const tarea = tareasService.crearTarea('Estudiar para el examen');

    expect(tarea.id).toBe(1);
    expect(tarea.titulo).toBe('Estudiar para el examen');
    expect(tarea.completada).toBe(false);
  });

  test('lanza un error si el titulo esta vacio', () => {
    expect(() => tareasService.crearTarea('   ')).toThrow('El titulo de la tarea es obligatorio');
  });

  test('lista todas las tareas creadas', () => {
    tareasService.crearTarea('Tarea 1');
    tareasService.crearTarea('Tarea 2');

    const tareas = tareasService.obtenerTareas();
    expect(tareas).toHaveLength(2);
  });

  test('obtiene una tarea existente por id', () => {
    const creada = tareasService.crearTarea('Repasar CI/CD');
    const encontrada = tareasService.obtenerTareaPorId(creada.id);

    expect(encontrada).toEqual(creada);
  });

  test('retorna undefined al buscar un id que no existe', () => {
    const resultado = tareasService.obtenerTareaPorId(999);
    expect(resultado).toBeUndefined();
  });

  test('actualiza el estado de una tarea a completada', () => {
    const tarea = tareasService.crearTarea('Configurar workflow');
    const actualizada = tareasService.actualizarTarea(tarea.id, { completada: true });

    expect(actualizada.completada).toBe(true);
  });

  test('retorna null al intentar actualizar una tarea inexistente', () => {
    const resultado = tareasService.actualizarTarea(999, { completada: true });
    expect(resultado).toBeNull();
  });

  test('elimina una tarea existente', () => {
    const tarea = tareasService.crearTarea('Tarea temporal');
    const eliminada = tareasService.eliminarTarea(tarea.id);

    expect(eliminada).toBe(true);
    expect(tareasService.obtenerTareas()).toHaveLength(0);
  });

  test('calcula correctamente el porcentaje de tareas completadas', () => {
    const t1 = tareasService.crearTarea('Tarea A');
    tareasService.crearTarea('Tarea B');
    tareasService.actualizarTarea(t1.id, { completada: true });

    expect(tareasService.calcularPorcentajeCompletado()).toBe(50);
  });

  test('el porcentaje completado es 0 cuando no hay tareas', () => {
    expect(tareasService.calcularPorcentajeCompletado()).toBe(0);
  });
});
