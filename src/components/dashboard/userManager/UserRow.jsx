import React from 'react';
import RoleSelect from './RoleSelect';
import ApproveButton from './ApproveButton';
import { TableRow, TableCell, IconButton, Box } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const UserRow = ({
  user,
  roleEdit,
  approving,
  savingRole,
  onRoleChange,
  onApprove,
  onSaveRole,
}) => (
  <TableRow
    sx={{
      backgroundColor: user.status === 'pending' ? 'action.hover' : 'inherit',
    }}
  >
    <TableCell
      sx={{
        wordBreak: 'break-word',
        width: { xs: '40%', sm: '30%' },
        minWidth: { xs: 60, sm: 100 },
        px: 1,
        py: 0.5,
        fontSize: { xs: '0.85rem', sm: '1rem' },
      }}
    >
      {user.username}
    </TableCell>
    <TableCell
      align="center"
      sx={{
        width: { xs: '30%', sm: '25%' },
        minWidth: { xs: 50, sm: 80 },
        px: 1,
        py: 0.5,
        maxWidth: 70,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <RoleSelect
          value={roleEdit ?? user.role}
          onChange={(e) => onRoleChange(user.id, e.target.value)}
          disabled={user.username === 'admin'}
        />
        {roleEdit !== undefined && roleEdit !== user.role && (
          <IconButton
            onClick={() => onSaveRole(user.id)}
            disabled={user.username === 'admin'}
            color="secondary"
            size="small"
            aria-label="Guardar rol"
          >
            <SaveOutlinedIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </TableCell>
    <TableCell
      align="right"
      sx={{
        width: { xs: '30%', sm: '45%' },
        minWidth: { xs: 60, sm: 120 },
        px: 1,
        py: 0.5,
        maxWidth: 90,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 0.5,
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
        }}
      >
        {user.status === 'pending' && (
          <ApproveButton
            onClick={() => onApprove(user.id)}
            loading={approving}
          />
        )}
        {/* Guardar ahora es un icono junto al dropdown */}
      </Box>
    </TableCell>
  </TableRow>
);

export default UserRow;
