import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
// importación de zoomPlugin y estilos
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PDFPreviewWithZoom = ({ fileUrl }) => {
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  return (
    <>
      <div style={{ marginBottom: 8, display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'flex-end' }}>
        <ZoomOutButton />
        <ZoomPopover />
        <ZoomInButton />
      </div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer fileUrl={fileUrl} plugins={[zoomPluginInstance]} />
      </Worker>
    </>
  );
};

export default PDFPreviewWithZoom;
