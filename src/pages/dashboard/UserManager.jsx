const ROLE_OPTIONS = [
  { value: 'admin', label: 'Administrador' },
  { value: 'user', label: 'Usuario' },
];

import React from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import UserTable from '../../components/dashboard/userManager/UserTable';
import useUsers from '../../hooks/user/useUsers';
import useApproveUser from '../../hooks/user/useApproveUser';
import useEditRole from '../../hooks/user/useEditRole';
import useDeactivateUser from '../../hooks/user/useDeactivateUser';

const UserManager = () => {
  const token = localStorage.getItem('token');
  const { users, setUsers, loading, error, setError } = useUsers(token);
  const { approving, handleApprove } = useApproveUser(
    token,
    setUsers,
    setError,
  );
  const {
    roleEdits,
    setRoleEdits,
    savingRole,
    handleRoleChange,
    handleSaveRole,
  } = useEditRole(token, setUsers, setError);
  const { deactivating, handleDeactivate } = useDeactivateUser(token, setUsers, setError);

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Box sx={{ overflowX: 'auto' }}>
        {/* Legend moved to NavBar */}
        {error && <Typography color="error">{error}</Typography>}
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 200,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <UserTable
            users={users}
            roleEdits={roleEdits}
            approving={approving}
            savingRole={savingRole}
            onRoleChange={handleRoleChange}
            onApprove={handleApprove}
            onSaveRole={handleSaveRole}
            onDelete={handleDeactivate}
            deleting={deactivating}
          />
        )}
      </Box>
    </Box>
  );
};

export default UserManager;
