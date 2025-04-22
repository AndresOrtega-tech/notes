import React from 'react';
import { Box, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

const SearchBar = ({ searchId, setSearchId, onSearch }) => {
  return (
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
        onClick={onSearch}
        disabled={!searchId}
      >
        Buscar
      </Button>
    </Box>
  );
};

export default SearchBar;