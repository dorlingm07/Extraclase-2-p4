# Extraclase 2 — CI/CD con GitHub Actions

Este repositorio contiene el trabajo que hice para el Extraclase 2 del curso Programación IV
(Universidad Nacional de Costa Rica, Escuela de Informática), sobre integración y despliegue
continuo con GitHub Actions.

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
  Extraclase_2_CICD_Informe.docx   # Documento con las evidencias y el Ejercicio 4
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

Estas son cosas que no se pueden dejar resueltas solo con código, porque dependen de mi
cuenta de GitHub y de Vercel:

1. **Crear el environment `production`** en *Settings > Environments* del repositorio y
   agregarle una regla de protección (por ejemplo, un aprobador requerido).
2. **Crear un proyecto en Vercel** vinculado a este repositorio y generar un token de acceso.
3. **Registrar los secrets** `VERCEL_TOKEN`, `VERCEL_ORG_ID` y `VERCEL_PROJECT_ID` en
   *Settings > Secrets and variables > Actions*.
4. Hacer push a `main` para que corran los tres workflows y **tomar las capturas de pantalla**
   que evidencien las ejecuciones.
5. Completar mi nombre completo, cédula y fecha de entrega en la portada del documento de
   `docs/Extraclase_2_CICD_Informe.docx`.

> **Nota:** dejé marcado con recuadros verdes dentro de
> `docs/Extraclase_2_CICD_Informe.docx` exactamente dónde va cada captura de pantalla
> (8 en total, repartidas entre los ejercicios 1, 2 y 3). Solo hay que reemplazar cada
> recuadro por la imagen correspondiente.

## Autoevaluación de la rúbrica

| Criterio | Estado |
|---|---|
| Ejercicio 1: Pipeline CI | Implementado y probado en local |
| Ejercicio 2: Pipeline CD | Implementado; falta configurar secrets/environment en GitHub y Vercel |
| Ejercicio 3: Matriz de pruebas | Implementado |
| Ejercicio 4: Análisis comparativo | Redactado en `docs/Extraclase_2_CICD_Informe.docx` (~600 palabras) |
| Capturas de pantalla | Pendientes de agregar por mí |
