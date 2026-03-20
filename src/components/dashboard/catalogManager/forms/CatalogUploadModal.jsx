import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CatalogUploadForm from './CatalogUploadForm';

const CatalogUploadModal = ({ open, onClose, name, setName, file, setFile, uploading, error, handleUpload, isMobile }) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
      Subir nuevo catálogo PDF
      <IconButton aria-label="cerrar" onClick={onClose} size="small">
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
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
    </DialogContent>
  </Dialog>
);

export default CatalogUploadModal;
