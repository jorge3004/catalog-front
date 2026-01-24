import React from 'react';
import LoginForm from '../components/login/LoginForm';
import LanguageSelector from '../components/LanguageSelector';

import { Box } from '@mui/material';

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 2, sm: 0 },
        bgcolor: 'background.default',
      }}
    >
      <LanguageSelector />
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
