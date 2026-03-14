import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, Tooltip, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RoleSelect from './RoleSelect';
import ApproveButton from './ApproveButton';
import { useTranslation } from 'react-i18next';

const UserCard = ({
  user,
  roleEdit,
  approving,
  savingRole,
  onRoleChange,
  onApprove,
  onSaveRole,
  onDelete,
  deleting,
}) => {
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const handleDelete = () => {
    setConfirmOpen(false);
    onDelete && onDelete(user.id);
  };
  return (
    <Card sx={{ mb: 1, display: 'flex', flexDirection: 'column', minHeight: 0, alignItems: 'center', position: 'relative', p: 2 }}>
      {/* Floating action icons on card, aligned with 'Usuario:' label */}
      <Box sx={{ position: 'absolute', top: 32, right: 8, display: 'flex', flexDirection: 'column', gap: 0.5, zIndex: 2 }}>
        {user.status === 'pending' && (
          <Tooltip title={t('users.header.actions')} arrow>
            <span>
              <ApproveButton onClick={() => onApprove(user.id)} loading={approving} />
            </span>
          </Tooltip>
        )}
        <Tooltip title={t('users.header.actions')} arrow>
          <IconButton color="error" size="small" onClick={() => setConfirmOpen(true)} sx={{ background: 'white', boxShadow: 1, p: '2px' }} disabled={deleting}>
            <DeleteOutlineOutlinedIcon fontSize="inherit" style={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          pb: '12px !important',
          minHeight: 0,
          flex: 1,
          width: '100%',
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
            columnGap: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography component="dt" variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {t('users.header.user')}
          </Typography>
          <Box component="dd" sx={{ m: 0, minWidth: 110, maxWidth: 110, fontWeight: 'bold', fontSize: '1rem', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user.username}
          </Box>
          <Box sx={{ gridColumn: '1 / span 2', display: 'flex', alignItems: 'center', mt: 0.5, mb: 0.5 }}>
            <Typography component="dt" variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.85rem', pr: 1, minWidth: 0 }}>
              {t('users.header.role')}
            </Typography>
            <Box component="dd" sx={{ m: 0, display: 'flex', alignItems: 'center', gap: 0, minWidth: 80, maxWidth: 110 }}>
              <RoleSelect
                value={roleEdit ?? user.role}
                onChange={e => onRoleChange(user.id, e.target.value)}
                disabled={user.username === 'admin'}
                sx={{ minWidth: 80, maxWidth: 110, fontSize: '0.85rem' }}
              />
              {roleEdit !== undefined && roleEdit !== user.role && (
                <IconButton
                  onClick={() => onSaveRole(user.id)}
                  disabled={user.username === 'admin'}
                  color="secondary"
                  size="small"
                  sx={{ ml: 0.5 }}
                  aria-label={t('users.header.role')}
                >
                  <SaveOutlinedIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>{t('deleteConfirmTitle', 'Delete user?')}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            {t('cancel', 'Cancel')}
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={deleting}>
            {deleting ? t('loading', 'Deleting...') : t('delete', 'Delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default UserCard;
