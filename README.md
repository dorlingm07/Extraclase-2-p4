# Extraclase 2 — CI/CD con GitHub Actions

Este repositorio contiene el trabajo que hice para el Extraclase 2 del curso Programación IV
(Universidad Latina de Costa Rica), sobre integración y despliegue continuo con GitHub Actions.

Para la parte práctica construí una pequeña API REST de gestión de tareas con **Node.js y
Express**, y sobre ese proyecto implementé los tres workflows de GitHub Actions que pedía el
enunciado, más el análisis comparativo del Ejercicio 4.

## Estructura del proyecto

```
.github/workflows/
  ci.yml       # Ejercicio 1: pipeline de integracion continua
  cd.yml       # Ejercicio 2: pipeline de despliegue continuo a Vercel
  matrix.yml   # Ejercicio 3: workflow con matriz de pruebas
api/
  index.js     # Punto de entrada que usa Vercel para desplegar la app como funcion serverless
src/
  app.js       # Definicion de la app de Express y sus rutas
  server.js    # Punto de entrada para correr el servidor en local
  tareas.js    # Logica de negocio (separada para poder probarla sin HTTP)
tests/
  app.test.js     # Pruebas de integracion sobre los endpoints
  tareas.test.js  # Pruebas unitarias sobre la logica de tareas
docs/
  Extraclase_2_CICD_Informe.pdf   # Documento con las evidencias, capturas y el Ejercicio 4
vercel.json    # Configuracion de despliegue en Vercel
```

## Cómo correrlo en local

```bash
npm install
npm run dev
```

La API queda disponible en `http://localhost:3000`. Las rutas principales son:

- `GET /` — mensaje de bienvenida.
- `GET /api/tareas` — lista las tareas y el porcentaje completado.
- `POST /api/tareas` — crea una tarea (`{ "titulo": "..." }`).
- `PUT /api/tareas/:id` — actualiza una tarea (por ejemplo, `{ "completada": true }`).
- `DELETE /api/tareas/:id` — elimina una tarea.

Para correr las pruebas y el linter (los mismos comandos que corre el pipeline de CI):

```bash
npm run lint
npm test
```

## Los tres workflows

- **`ci.yml`** se dispara en `push` a `main`/`develop` y en `pull_request` hacia `main`. Corre
  el linter, las 17 pruebas del proyecto con cobertura, sube el reporte de cobertura como
  artifact y deja un resumen de éxito/fallo en el propio job.
- **`cd.yml`** se dispara automáticamente cuando `ci.yml` termina exitosamente sobre `main`.
  Construye la app y la despliega a Vercel usando la CLI oficial, dentro de un `environment`
  llamado `production` protegido, leyendo las credenciales desde GitHub Secrets.
- **`matrix.yml`** corre las pruebas en paralelo combinando Node 18/20/22 con
  `ubuntu-latest`/`windows-latest` (con `fail-fast: false` y una combinación excluida a modo de
  ejemplo).

## Pendientes que me faltan por completar a mano

Ya configuré el environment `production`, los secrets de Vercel, tomé las 8 capturas de
pantalla y completé mi nombre en la portada. Dejé la cédula y la fecha de entrega fuera del
documento a propósito, porque el repositorio es público.

## Autoevaluación de la rúbrica

| Criterio | Estado |
|---|---|
| Ejercicio 1: Pipeline CI | Implementado, probado y con capturas de evidencia |
| Ejercicio 2: Pipeline CD | Implementado y desplegado exitosamente a Vercel |
| Ejercicio 3: Matriz de pruebas | Implementado y con capturas de evidencia |
| Ejercicio 4: Análisis comparativo | Redactado en `docs/Extraclase_2_CICD_Informe.pdf` (~600 palabras) |
| Portada del documento | Completa |
| Capturas de pantalla | Las 8 agregadas en el documento final |
| Portada del documento | Falta completar mi nombre completo |
