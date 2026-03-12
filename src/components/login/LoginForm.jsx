import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useLogin from '../../hooks/useLogin';
import LoginLinks from './LoginLinks';

const LoginForm = () => {
  const { t } = useTranslation();
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  } = useLogin();
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        mt: { xs: 4, sm: 10 },
        mb: { xs: 4, sm: 10 },
        px: { xs: 2, sm: 4 },
        py: { xs: 3, sm: 5 },
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: { xs: 0, sm: 6 },
        transition: 'box-shadow 0.3s, padding 0.3s',
      }}
    >
      <Typography variant="h5" align="center">
        {t('login.title')}
      </Typography>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      <TextField
        label={t('login.username', 'Usuario')}
        variant="outlined"
        fullWidth
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        InputLabelProps={{
          sx: (theme) => ({
            color:
              theme.palette.mode === 'dark'
                ? '#fff'
                : theme.palette.text.primary,
            background: 'transparent',
            zIndex: 1,
            '&.Mui-focused': {
              color:
                theme.palette.mode === 'dark'
                  ? '#90caf9'
                  : theme.palette.secondary.main,
            },
            '&.MuiInputLabel-shrink': {
              color:
                theme.palette.mode === 'dark'
                  ? '#90caf9'
                  : theme.palette.secondary.main,
            },
          }),
        }}
        inputProps={{
          sx: (theme) => ({
            color:
              theme.palette.mode === 'dark'
                ? '#fff'
                : theme.palette.text.primary,
          }),
        }}
      />
      <TextField
        label={t('login.password')}
        type="password"
        variant="outlined"
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{
          sx: (theme) => ({
            color:
              theme.palette.mode === 'dark'
                ? '#fff'
                : theme.palette.text.primary,
            background: 'transparent',
            zIndex: 1,
            '&.Mui-focused': {
              color:
                theme.palette.mode === 'dark'
                  ? '#90caf9'
                  : theme.palette.secondary.main,
            },
            '&.MuiInputLabel-shrink': {
              color:
                theme.palette.mode === 'dark'
                  ? '#90caf9'
                  : theme.palette.secondary.main,
            },
          }),
        }}
        inputProps={{
          sx: (theme) => ({
            color:
              theme.palette.mode === 'dark'
                ? '#fff'
                : theme.palette.text.primary,
          }),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? t('login.loading', 'Cargando...') : t('login.loginButton')}
      </Button>
      <LoginLinks />
    </Box>
  );
};

export default LoginForm;
