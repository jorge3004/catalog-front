import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const CatalogUploadForm = ({
  name,
  setName,
  file,
  setFile,
  uploading,
  error,
  handleUpload,
  isMobile
}) => (
  <Box
    component="form"
    onSubmit={handleUpload}
    sx={{
      mb: 3,
      display: 'flex',
      gap: 2,
      alignItems: { xs: 'stretch', sm: 'center' },
      flexDirection: { xs: 'column', sm: 'row' },
    }}
  >
    <TextField
      label="Nombre del catálogo"
      value={name}
      onChange={(e) => setName(e.target.value)}
      size="small"
      fullWidth={isMobile}
    />
    <input
      id="pdf-upload"
      type="file"
      accept="application/pdf"
      style={{ display: 'none' }}
      onChange={e => setFile(e.target.files[0])}
    />
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label htmlFor="pdf-upload" style={{ width: '100%' }}>
        <Button
          variant="outlined"
          color="secondary"
          component="span"
          sx={{
            width: '100%',
            py: 1.5,
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: 2,
            boxShadow: 1,
            textTransform: 'none',
            mb: 1
          }}
        >
          {file ? 'Archivo seleccionado' : 'Elegir archivo PDF'}
        </Button>
      </label>
      <Typography
        variant="body2"
        color={error ? 'error' : 'textSecondary'}
        sx={{ mt: 0.5, minHeight: 24 }}
      >
        {error || (file ? file.name : 'Ningún archivo seleccionado')}
      </Typography>
    </Box>
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={uploading || !file || !name}
      sx={{
        minWidth: 120,
        fontWeight: 600,
        fontSize: '1rem',
        borderRadius: 2,
        boxShadow: 1,
        textTransform: 'none',
        alignSelf: { xs: 'stretch', sm: 'center' }
      }}
    >
      {uploading ? 'Subiendo...' : 'Subir PDF'}
    </Button>
  </Box>
);

export default CatalogUploadForm;
