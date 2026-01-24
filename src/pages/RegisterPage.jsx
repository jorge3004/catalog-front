import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
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
        {t('register.title', 'Registro de usuario')}
      </Typography>
      <Typography align="center" sx={{ mb: 2 }}>
        {t(
          'register.instructions',
          'Por favor, contacta al administrador para crear una cuenta.',
        )}
      </Typography>
      <Button variant="contained" color="primary" fullWidth href="/login">
        {t('register.backToLogin', 'Volver al login')}
      </Button>
    </Box>
  );
};

export default RegisterPage;
