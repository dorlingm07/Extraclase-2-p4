const request = require('supertest');
const crearApp = require('../src/app');
const tareasService = require('../src/tareas');

describe('API REST de tareas (pruebas de integracion)', () => {
  const app = crearApp();

  beforeEach(() => {
    tareasService.reiniciarTareas();
  });

  test('GET / responde con un mensaje de bienvenida', async () => {
    const respuesta = await request(app).get('/');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.mensaje).toMatch(/API de gestion de tareas/);
  });

  test('GET /api/tareas responde con una lista vacia al inicio', async () => {
    const respuesta = await request(app).get('/api/tareas');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.tareas).toEqual([]);
  });

  test('POST /api/tareas crea una tarea nueva', async () => {
    const respuesta = await request(app)
      .post('/api/tareas')
      .send({ titulo: 'Escribir el informe de CI/CD' });

    expect(respuesta.status).toBe(201);
    expect(respuesta.body.titulo).toBe('Escribir el informe de CI/CD');
  });

  test('POST /api/tareas responde 400 si falta el titulo', async () => {
    const respuesta = await request(app).post('/api/tareas').send({});

    expect(respuesta.status).toBe(400);
  });

  test('GET /api/tareas/:id responde 404 si la tarea no existe', async () => {
    const respuesta = await request(app).get('/api/tareas/999');

    expect(respuesta.status).toBe(404);
  });

  test('PUT /api/tareas/:id marca una tarea como completada', async () => {
    const creada = await request(app).post('/api/tareas').send({ titulo: 'Probar el pipeline' });

    const respuesta = await request(app)
      .put(`/api/tareas/${creada.body.id}`)
      .send({ completada: true });

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.completada).toBe(true);
  });

  test('DELETE /api/tareas/:id elimina una tarea existente', async () => {
    const creada = await request(app).post('/api/tareas').send({ titulo: 'Tarea a borrar' });

    const respuesta = await request(app).delete(`/api/tareas/${creada.body.id}`);

    expect(respuesta.status).toBe(204);
  });
});
