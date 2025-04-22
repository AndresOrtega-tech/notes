import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <Card sx={{ 
      width: '300px',    // Ancho fijo para todas las tarjetas
      height: '200px',   // Altura fija para todas las tarjetas
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',  // Centra la tarjeta en su contenedor
      '@media (max-width: 600px)': {
        width: '100%',   // En pantallas pequeñas ocupa todo el ancho
      }
    }}>
      <CardContent sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '100%'
          }}
        >
          {note.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            maxHeight: '4.5em',
            minHeight: '3em',
            flex: 1
          }}
        >
          {note.content}
        </Typography>
        <Box sx={{ 
          mt: 'auto',
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: 1 
        }}>
          <IconButton size="small" onClick={() => onEdit(note)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(note.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteCard;