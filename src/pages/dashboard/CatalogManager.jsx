import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import Tooltip from '@mui/material/Tooltip';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import PDFPreviewWithZoom from '../../components/dashboard/catalogManager/PDFPreviewWithZoom';

import {
// Lógica de catálogos movida a useCatalogs
} from '../../api/catalogApi';
import {
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import useCatalogs from '../../hooks/catalog/useCatalogs';
import { useAuth } from '../../context/AuthContext';
import CatalogCardList from '../../components/dashboard/catalogManager/CatalogCardList';
import CatalogUploadForm from '../../components/dashboard/catalogManager/forms/CatalogUploadForm';
import CatalogTableList from '../../components/dashboard/catalogManager/table/CatalogTableList';
import { useTheme } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AttachFileIcon from '@mui/icons-material/AttachFile';



const CatalogManager = () => {
  const { user } = useAuth();

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setPreviewUrl('');
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const token = localStorage.getItem('token');

  // Custom hook para lógica de catálogos
  const {
    catalogs,
    loading,
    error,
    uploading,
    handleUpload: hookHandleUpload,
    handleDelete: hookHandleDelete,
    setError,
  } = useCatalogs(token);

  // Asegura que la vista previa siempre use la URL real del PDF
  const handlePreview = (urlOrId) => {
    let url = urlOrId;
    if (typeof urlOrId === 'number') {
      const cat = catalogs.find(c => c.id === urlOrId);
      if (cat && cat.url) url = cat.url;
    }
    setPreviewUrl(url);
    setPreviewOpen(true);
  };

  // Wrapper para el form
  const handleUpload = (e) => {
    hookHandleUpload(e, name, file);
    setFile(null);
    setName('');
  };

  // Wrapper para el delete con confirmación
  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este catálogo?')) {
      hookHandleDelete(id);
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      {error && <Typography color="error">{error}</Typography>}
      {user?.role === 'admin' && (
        <CatalogUploadForm
          name={name}
          setName={setName}
          file={file}
          setFile={setFile}
          uploading={uploading}
          error={error}
          handleUpload={handleUpload}
          isMobile={isMobile}
        />
      )}
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
            userRole={user?.role}
          />
        ) : (
          <CatalogTableList
            catalogs={catalogs}
            handlePreview={handlePreview}
            handleDelete={handleDelete}
            userRole={user?.role}
          />
        )
      )}
      <Dialog
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle sx={{ pr: 1, position: 'relative', minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{
            previewUrl
              ? (catalogs.find(cat => cat.url === previewUrl)?.name || 'PDF')
              : 'PDF'
          }</span>
        </DialogTitle>
        <DialogContent sx={{ position: 'relative', p: 0 }}>
          {previewUrl ? (
            <PDFPreviewWithZoom fileUrl={previewUrl} onClose={handleClosePreview} />
          ) : (
            <Typography>No se pudo cargar el PDF.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CatalogManager;
