import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import RoleSelect from './RoleSelect';
import ApproveButton from './ApproveButton';

const UserCard = ({
  user,
  roleEdit,
  approving,
  savingRole,
  onRoleChange,
  onApprove,
  onSaveRole,
}) => (
  <Card sx={{ mb: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0 }}>
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        pb: '12px !important',
        minHeight: 0,
      }}
    >
      <Box
        component="dl"
        sx={{
          m: 0,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          rowGap: 1,
          columnGap: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography component="dt" variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          Usuario:
        </Typography>
        <Typography component="dd" variant="subtitle1" fontWeight="bold" sx={{ m: 0 }}>
          {user.username}
        </Typography>
        <Typography component="dt" variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          Rol:
        </Typography>
        <Box component="dd" sx={{ m: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
          <RoleSelect
            value={roleEdit ?? user.role}
            onChange={e => onRoleChange(user.id, e.target.value)}
            disabled={user.username === 'admin'}
          />
          {roleEdit !== undefined && roleEdit !== user.role && (
            <IconButton
              onClick={() => onSaveRole(user.id)}
              disabled={user.username === 'admin'}
              color="secondary"
              size="small"
              sx={{ ml: 0.5 }}
              aria-label="Guardar rol"
            >
              <SaveOutlinedIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        {/* Aquí puedes agregar más campos en el futuro, siguiendo el mismo patrón */}
      </Box>
      {user.status === 'pending' && (
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            mt: 2.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <ApproveButton onClick={() => onApprove(user.id)} loading={approving} />
        </Box>
      )}
    </CardContent>
  </Card>
);

export default UserCard;
