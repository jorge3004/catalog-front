import React from 'react';
import { Select, MenuItem } from '@mui/material';

const RoleSelect = ({ value, onChange, disabled }) => (
  <Select
    value={value}
    onChange={onChange}
    disabled={disabled}
    size="small"
    sx={{
      minWidth: 100,
      fontSize: { xs: '0.80rem', sm: '0.95rem' },
      height: 28,
    }}
    MenuProps={{ PaperProps: { style: { maxHeight: 180 } } }}
  >
    <MenuItem value="admin">Administrador</MenuItem>
    <MenuItem value="user">Usuario</MenuItem>
  </Select>
);

export default RoleSelect;
