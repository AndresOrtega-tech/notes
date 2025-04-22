# Aplicación de Notas (Full Stack)

Aplicación web de notas desarrollada con React (Frontend) y FastAPI + MySQL (Backend).

## Estructura del Proyecto
```
notes-app/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   └── requirements.txt
└── frontend/
    ├── public/
    └── src/
        ├── components/
        │   ├── NoteForm.js
        │   ├── NoteCard.js
        │   ├── SearchBar.js
        │   ├── index.js
        │   └── SearchDialog.js
        ├── services/
        │   └── api.js
        ├── App.js
        └── index.js
```

## Tecnologías Utilizadas

### Backend
- Python 3.x
- FastAPI
- SQLAlchemy
- MySQL (XAMPP)
- PyMySQL

### Frontend
- React
- Material-UI
- Axios
- Material Icons

## Requisitos Previos
- Python 3.x instalado
- Node.js instalado
- XAMPP instalado y corriendo (MySQL en puerto 3306)
- Base de datos 'notes_db' creada en MySQL

## Instalación y Configuración

### Backend

1. Crear y activar entorno virtual:
```bash
python -m venv venv
.\\venv\\Scripts\\activate  # Windows
source venv/bin/activate # Linux/Mac
```

2. Instalar dependencias:
```bash
cd backend
pip install -r requirements.txt
```

3. Iniciar servidor:
```bash
python -m uvicorn main:app --reload
```

El backend se ejecutará en http://localhost:8000

### Frontend

1. Instalar dependencias:
```bash
cd frontend
npm install
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install axios
```

2. Iniciar aplicación:
```bash
npm start
```

El frontend se ejecutará en http://localhost:3000

## API Endpoints
- GET /notes/: Obtener todas las notas
- GET /notes/{id}: Obtener nota por ID
- POST /notes/: Crear nueva nota
- PUT /notes/{id}: Actualizar nota existente
- DELETE /notes/{id}: Eliminar nota

## Características
- CRUD completo de notas
- Interfaz de usuario moderna y responsive
- Búsqueda de notas por ID
- Validaciones y manejo de errores
- Confirmaciones para acciones destructivas

## Base de Datos
- Motor: MySQL
- Puerto: 3306
- Nombre BD: notes_db
- Tabla: notes
    - id (INT, PRIMARY KEY)
    - title (VARCHAR)
    - content (TEXT)
    - created_at (DATETIME)
    - updated_at (DATETIME)

## Desarrollo
- Backend: Framework FastAPI para API RESTful
- SQLAlchemy como ORM
