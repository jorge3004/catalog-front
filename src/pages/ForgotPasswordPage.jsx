import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        mt: { xs: 4, sm: 8 },
        px: { xs: 2, sm: 0 },
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: { xs: 0, sm: 2 },
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {t('forgot.title', 'Recuperar contraseña')}
      </Typography>
      <Typography align="center" sx={{ mb: 2 }}>
        {t(
          'forgot.instructions',
          'Por favor, contacta al administrador para recuperar tu contraseña.',
        )}
      </Typography>
      <Button variant="contained" color="primary" fullWidth href="/login">
        {t('forgot.backToLogin', 'Volver al login')}
      </Button>
    </Box>
  );
};

export default ForgotPasswordPage;
