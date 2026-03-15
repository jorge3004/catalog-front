import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Box
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteIcon from '@mui/icons-material/Delete';

const CatalogTableList = ({ catalogs, handlePreview, handleDelete, userRole }) => (
  <TableContainer
    component={Paper}
    sx={{
      boxShadow: 3,
      width: '100%',
      maxWidth: '100%',
      overflowX: 'auto',
    }}
  >
    <Table
      size="medium"
      sx={{ minWidth: 600, width: '100%', maxWidth: '100%' }}
    >
      <TableHead>
        <TableRow>
          <TableCell sx={{ minWidth: 40 }}>ID</TableCell>
          <TableCell sx={{ minWidth: 120, p: 1, textAlign: 'center', verticalAlign: 'middle' }}>
            <Box sx={{ width: '100%' }}>Nombre</Box>
          </TableCell>
          <TableCell sx={{ minWidth: 100 }}>Subido por</TableCell>
          <TableCell sx={{ minWidth: 120 }}>Fecha</TableCell>
          <TableCell align="center" sx={{ minWidth: 120, width: '200px !important', maxWidth: '200px !important', p: 1, textAlign: 'center', verticalAlign: 'middle' }}>
            Acciones
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {catalogs.map((cat) => (
          <TableRow key={cat.id}>
            <TableCell>{cat.id}</TableCell>
            <TableCell sx={{ wordBreak: 'break-word', maxWidth: 120 }}>
              {cat.name}
            </TableCell>
            <TableCell sx={{ wordBreak: 'break-word', maxWidth: 100 }}>
              {cat.uploaded_by}
            </TableCell>
            <TableCell sx={{ wordBreak: 'break-word', maxWidth: 120 }}>
              {new Date(cat.created_at).toLocaleString()}
            </TableCell>
            <TableCell align="center" sx={{ p: 1, width: '200px !important', maxWidth: '200px !important', textAlign: 'center', verticalAlign: 'middle' }}>
              <IconButton onClick={() => handlePreview(cat.url)} title="Vista previa PDF" size="medium" sx={{ m: 0.5 }}>
                <VisibilityIcon fontSize="medium" />
              </IconButton>
              {userRole === 'admin' && (
                <>
                  <IconButton component="a" href={cat.url} download title="Descargar PDF" size="medium" sx={{ m: 0.5 }}>
                    <CloudDownloadIcon fontSize="medium" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(cat.id)} title="Eliminar catálogo" size="medium" sx={{ m: 0.5 }}>
                    <DeleteIcon fontSize="medium" color="error" />
                  </IconButton>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default CatalogTableList;
