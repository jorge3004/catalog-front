import React from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
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
      <TextField
        label={t('login.username', 'Usuario')}
        variant="outlined"
        fullWidth
        required
        InputLabelProps={{
          sx: (theme) => ({
            color: theme.palette.text.primary,
            background: 'transparent',
            zIndex: 1,
            '&.Mui-focused': {
              color: theme.palette.secondary.main,
            },
            '&.MuiInputLabel-shrink': {
              color: theme.palette.secondary.main,
            },
          }),
        }}
        inputProps={{
          sx: (theme) => ({ color: theme.palette.text.primary }),
        }}
      />
      <TextField
        label={t('login.password')}
        type="password"
        variant="outlined"
        fullWidth
        required
        InputLabelProps={{
          sx: (theme) => ({
            color: theme.palette.text.primary,
            background: 'transparent',
            zIndex: 1,
            '&.Mui-focused': {
              color: theme.palette.secondary.main,
            },
            '&.MuiInputLabel-shrink': {
              color: theme.palette.secondary.main,
            },
          }),
        }}
        inputProps={{
          sx: (theme) => ({ color: theme.palette.text.primary }),
        }}
      />
      <Button variant="contained" color="primary" fullWidth>
        {t('login.loginButton')}
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <MuiLink
          component={Link}
          to="/forgot"
          sx={(theme) => ({
            color: theme.palette.secondary.main,
            fontWeight: 500,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          })}
        >
          {t('login.forgot')}
        </MuiLink>
        <MuiLink
          component={Link}
          to="/register"
          sx={(theme) => ({
            color: theme.palette.secondary.main,
            fontWeight: 500,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          })}
        >
          {t('login.register')}
        </MuiLink>
      </Box>
    </Box>
  );
};

export default LoginForm;
