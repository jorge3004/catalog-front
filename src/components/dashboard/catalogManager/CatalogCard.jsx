import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, Avatar, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const CatalogCard = ({ catalog, onPreview, onDownload, onDelete }) => {
  // Si tienes un thumbnail, úsalo aquí. Si no, usa un ícono por defecto.
  const thumbnail = catalog.thumbnailUrl || null;
  // Nuevo tamaño
  const thumbWidth = 96;
  const thumbHeight = 135;
  return (
    <Card sx={{ mb: 1.2, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, pb: '12px !important', width: '100%' }}>
        <Box sx={{ mb: 1, width: thumbWidth, height: thumbHeight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            sx={{ width: thumbWidth, height: thumbHeight, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => onPreview(catalog.url)}
            title="Vista previa PDF"
          >
            {thumbnail ? (
              <Avatar variant="rounded" src={thumbnail} alt={catalog.name} sx={{ width: thumbWidth, height: thumbHeight, boxShadow: 1 }} />
            ) : (
              <Avatar variant="rounded" sx={{ width: thumbWidth, height: thumbHeight, bgcolor: 'grey.200', color: 'grey.600', fontSize: 36 }}>
                PDF
              </Avatar>
            )}
          </Box>
        </Box>
        {/* Iconos flotantes alineados a la derecha sobre el título */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 0.5 }}>
          <Tooltip title="Ver PDF en nueva pestaña" arrow>
            <IconButton component="a" href={catalog.url} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: 'grey.600', p: 0.5 }}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton onClick={() => onDelete(catalog.id)} title="Eliminar" size="small" sx={{ color: 'grey.600', p: 0.5 }}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          color="text.primary"
          align="center"
          sx={{
            mt: 0.5,
            fontWeight: 500,
            fontSize: '0.85rem',
            width: '100%',
            maxWidth: '100%',
            wordBreak: 'break-word',
            textAlign: 'center',
            display: 'block',
          }}
        >
          {catalog.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CatalogCard;
