import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import axios from 'axios';

// Main application component for a notes management system
function App() {
  // State management for notes and UI controls
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  // Fetches all notes from the backend API
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/notes/');
      setNotes(response.data);
    } catch (error) {
      console.error('Error al obtener las notas:', error);
    }
  };

  // Initial data loading on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Handles searching for a specific note by ID
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/notes/${searchId}`);
      setSearchResult(response.data);
      setShowSearchDialog(true);
    } catch (error) {
      alert('Nota no encontrada');
    }
  };

  // Handles form submission for creating/updating notes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/notes/${editingId}`, {
          title,
          content
        });
      } else {
        await axios.post('http://localhost:8000/notes', {
          title,
          content
        });
      }
      clearForm();
      fetchNotes();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handles note deletion with confirmation
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      try {
        await axios.delete(`http://localhost:8000/notes/${id}`);
        fetchNotes();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Prepares the form for editing an existing note
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
    setOpenDialog(true);
  };

  // Resets the form fields
  const clearForm = () => {
    setTitle('');
    setContent('');
    setEditingId(null);
  };

  // Main component render with UI elements
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Aplicación de Notas
        </Typography>

        {/* Barra de herramientas */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2, justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              clearForm();
              setOpenDialog(true);
            }}
          >
            Nueva Nota
          </Button>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              label="Buscar por ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              InputProps={{
                endAdornment: searchId && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchId('')}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              disabled={!searchId}
            >
              Buscar
            </Button>
          </Box>
        </Box>

        {/* Lista de notas */}
        <Grid container spacing={2}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {note.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {note.content}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <IconButton size="small" onClick={() => handleEdit(note)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(note.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Diálogo para crear/editar nota */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editingId ? 'Editar Nota' : 'Nueva Nota'}</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                fullWidth
                label="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Contenido"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                margin="normal"
                multiline
                rows={4}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
              <Button type="submit" variant="contained">
                {editingId ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Diálogo para mostrar resultado de búsqueda */}
        <Dialog open={showSearchDialog} onClose={() => setShowSearchDialog(false)}>
          <DialogTitle>Resultado de la búsqueda</DialogTitle>
          <DialogContent>
            {searchResult && (
              <>
                <Typography variant="h6">{searchResult.title}</Typography>
                <Typography variant="body1">{searchResult.content}</Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSearchDialog(false)}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default App;