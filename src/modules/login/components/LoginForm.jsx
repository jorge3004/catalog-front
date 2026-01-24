import React from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation();
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: 'auto',
        mt: 8,
      }}
    >
      <Typography variant="h5" align="center">
        {t('login.title')}
      </Typography>
      <TextField
        label={t('login.email')}
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        label={t('login.password')}
        type="password"
        variant="outlined"
        fullWidth
        required
      />
      <Button variant="contained" color="primary" fullWidth>
        {t('login.loginButton')}
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="#">{t('login.forgot')}</Link>
        <Link href="#">{t('login.register')}</Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
