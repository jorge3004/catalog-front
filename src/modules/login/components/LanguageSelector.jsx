import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120, mb: 2 }}>
      <InputLabel id="lang-label">Idioma</InputLabel>
      <Select
        labelId="lang-label"
        value={i18n.language}
        label="Idioma"
        onChange={handleChange}
      >
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
