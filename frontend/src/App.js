import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard';
import SearchBar from './components/SearchBar';
import SearchDialog from './components/SearchDialog';
import { getNotes, createNote, updateNote, deleteNote, getNote } from './services/api';

function App() {
  // Estados
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  // Cargar notas al iniciar
useEffect(() => {
  console.log('Cargando notas...');
  fetchNotes();
}, []);

  // Obtener todas las notas
  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data);
    } catch (error) {
      console.error('Error al obtener las notas:', error);
    }
  };

  // Buscar nota por ID
  const handleSearch = async () => {
    try {
      const response = await getNote(searchId);
      setSearchResult(response.data);
      setShowSearchDialog(true);
    } catch (error) {
      alert('Nota no encontrada');
    }
  };

  // Crear/Actualizar nota
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateNote(editingId, { title, content });
      } else {
        await createNote({ title, content });
      }
      clearForm();
      fetchNotes();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Eliminar nota
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      try {
        await deleteNote(id);
        fetchNotes();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Preparar edición de nota
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
    setOpenDialog(true);
  };

  // Limpiar formulario
  const clearForm = () => {
    setTitle('');
    setContent('');
    setEditingId(null);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Aplicación de Notas
        </Typography>

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
          <SearchBar 
            searchId={searchId}
            setSearchId={setSearchId}
            onSearch={handleSearch}
          />
        </Box>

        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={note.id} 
              sx={{ 
                display: 'flex',
                justifyContent: 'right'
              }}
            >
              <NoteCard 
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>

        <NoteForm 
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
          onSubmit={handleSubmit}
          editingId={editingId}
        />

        <SearchDialog 
          open={showSearchDialog}
          onClose={() => setShowSearchDialog(false)}
          searchResult={searchResult}
        />
      </Box>
    </Container>
  );
}

export default App;