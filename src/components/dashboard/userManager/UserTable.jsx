import React from 'react';
import UserManagerHeader from './UserManagerHeader';
import UserRow from './UserRow';
import UserCard from './UserCard';
import { Table, TableBody, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const UserTable = ({
  users,
  roleEdits,
  approving,
  savingRole,
  onRoleChange,
  onApprove,
  onSaveRole,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <div>
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            roleEdit={roleEdits[user.id]}
            approving={approving[user.id]}
            savingRole={savingRole[user.id]}
            onRoleChange={onRoleChange}
            onApprove={onApprove}
            onSaveRole={onSaveRole}
          />
        ))}
      </div>
    );
  }

  return (
    <Table sx={{ minWidth: 600, width: '100%' }}>
      <UserManagerHeader />
      <TableBody>
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            roleEdit={roleEdits[user.id]}
            approving={approving[user.id]}
            savingRole={savingRole[user.id]}
            onRoleChange={onRoleChange}
            onApprove={onApprove}
            onSaveRole={onSaveRole}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
