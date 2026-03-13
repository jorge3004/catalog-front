import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import Tooltip from '@mui/material/Tooltip';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import {
  getCatalogs,
  uploadCatalog,
  deleteCatalog,
  getOrCreateThumbnail,
} from '../../api/catalogApi';
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  IconButton,
  useMediaQuery,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import CatalogCardList from '../../components/dashboard/catalogManager/CatalogCardList';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';



const CatalogManager = () => {
  // Plugin de zoom para PDF Viewer (debe ir dentro del componente)
  // const zoomPluginInstance = zoomPlugin();
  // const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  const [catalogs, setCatalogs] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');
   const [file, setFile] = useState(null);
   const [name, setName] = useState('');
   const [uploading, setUploading] = useState(false);
   const [previewOpen, setPreviewOpen] = useState(false);
   const [previewUrl, setPreviewUrl] = useState('');
  const token = localStorage.getItem('token');


  const handlePreview = (url) => {
    setPreviewUrl(url);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setPreviewUrl('');
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  // DEBUG: Ver el contenido de catalogs en consola
  useEffect(() => {
    if (catalogs && catalogs.length) {
      console.log('Catalogs:', catalogs);
    }
  }, [catalogs]);

  const fetchCatalogs = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getCatalogs(token);
      setCatalogs(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Hook para cargar thumbnails en modo móvil
  useEffect(() => {
    if (!isMobile || !catalogs.length) return;
    const token = localStorage.getItem('token');
    const updateThumbnails = async () => {
      const updated = await Promise.all(
        catalogs.map(async (cat) => {
          if (!cat.thumbnailUrl) {
            try {
              const url = await getOrCreateThumbnail(cat.id, token);
              return { ...cat, thumbnailUrl: url };
            } catch {
              return cat;
            }
          }
          return cat;
        })
      );
      setCatalogs(updated);
    };
    updateThumbnails();
    // eslint-disable-next-line
  }, [isMobile, catalogs.length]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      await uploadCatalog({ file, name, token });
      setFile(null);
      setName('');
      await fetchCatalogs();
    } catch (err) {
      setError(err.message);
    }
    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este catálogo?')) return;
    setError('');
    try {
      await deleteCatalog({ id, token });
      await fetchCatalogs();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      {/* Legend moved to NavBar */}
      {error && <Typography color="error">{error}</Typography>}
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
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: 'inline-block' }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={uploading || !file}
          sx={{ minWidth: 100 }}
        >
          {uploading ? 'Subiendo...' : 'Subir PDF'}
        </Button>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        isMobile ? (
          <CatalogCardList
            catalogs={catalogs}
            onPreview={handlePreview}
            onDownload={() => {}}
            onDelete={handleDelete}
          />
        ) : (
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
                      <IconButton component="a" href={cat.url} target="_blank" rel="noopener noreferrer" title="Descargar PDF" size="medium" sx={{ m: 0.5 }}>
                        <CloudDownloadIcon fontSize="medium" />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(cat.id)} title="Eliminar" size="medium" sx={{ m: 0.5 }}>
                        <DeleteIcon fontSize="medium" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
      <Dialog
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle sx={{ pr: 1, position: 'relative', minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Vista previa PDF</span>
          {previewUrl && (
            <Tooltip title="Ver PDF en S3 (nueva pestaña)" arrow>
              <IconButton component="a" href={previewUrl} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: 'grey.600', ml: 1 }}>
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </DialogTitle>
        <DialogContent>
          {previewUrl ? (
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={previewUrl} />
            </Worker>
          ) : (
            <Typography>No se pudo cargar el PDF.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CatalogManager;
