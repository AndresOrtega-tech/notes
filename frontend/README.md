# Aplicación de Notas

Esta es una aplicación web de notas desarrollada con React para el frontend y FastAPI para el backend.

## Características

- Crear nuevas notas
- Ver lista de todas las notas
- Buscar notas por ID
- Editar notas existentes
- Eliminar notas
- Interfaz responsive usando Material-UI

## Tecnologías Utilizadas

- React
- Material-UI (@mui/material)
- Axios para peticiones HTTP
- Material Icons (@mui/icons-material)

## Instalación

1. Instalar dependencias:
```bash
npm install
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install axios
```

Iniciar la aplicación:
```bash
npm start
```
La aplicación se ejecutará en http://localhost:3000

## Estructura del Proyecto
- src/App.js: Componente principal que contiene toda la lógica y UI
- Funcionalidades implementadas:
- - Formulario para crear/editar notas
- - Lista de notas mostradas en formato de tarjetas
- - Barra de búsqueda por ID
- - Diálogos modales para crear/editar
- - Confirmación de eliminación

## API Endpoints Utilizados
- GET /api/notes: Obtiene todas las notas  
- GET /api/notes/:id: Obtiene una nota por ID  
- POST /api/notes: Crea una nueva nota  
- PUT /api/notes/:id: Actualiza una nota existente  
- DELETE /api/notes/:id: Elimina una nota existente  

## Notas del Desarrollo
- La aplicación utiliza Material-UI para un diseño moderno y responsive
- Implementa gestión de estado con React Hooks (useState, useEffect)
- Manejo de errores y validaciones básicas
- Confirmaciones para acciones destructivas (eliminar)

