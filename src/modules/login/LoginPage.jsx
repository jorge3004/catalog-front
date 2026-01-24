import React from 'react';
import LoginForm from './components/LoginForm';
import LanguageSelector from './components/LanguageSelector';

const LoginPage = () => {
  return (
    <div>
      <LanguageSelector />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
