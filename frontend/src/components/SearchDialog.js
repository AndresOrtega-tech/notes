import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography 
} from '@mui/material';

const SearchDialog = ({ open, onClose, searchResult }) => {
  return (
    <Dialog open={open} onClose={onClose}>
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
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchDialog;