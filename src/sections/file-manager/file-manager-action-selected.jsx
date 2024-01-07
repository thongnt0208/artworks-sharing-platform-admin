import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Portal from '@mui/material/Portal';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function FileManagerActionSelected({
  action,
  selected,
  rowCount,
  numSelected,
  onSelectAllItems,
  sx,
  ...other
}) {
  return (
    <Portal>
      <Box
        sx={{
          right: 0,
          zIndex: 9,
          bottom: 0,
          display: 'flex',
          borderRadius: 1.5,
          position: 'fixed',
          alignItems: 'center',
          bgcolor: 'text.primary',
          p: (theme) => theme.spacing(1.5, 2, 1.5, 1),
          boxShadow: (theme) => theme.customShadows.z20,
          m: { xs: 2, md: 3 },
          ...sx,
        }}
        {...other}
      >
        <Checkbox
          indeterminate={!!numSelected && numSelected < rowCount}
          checked={!!rowCount && numSelected === rowCount}
          onChange={(event) => onSelectAllItems(event.target.checked)}
          icon={<Iconify icon="eva:radio-button-off-fill" />}
          checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
          indeterminateIcon={<Iconify icon="eva:minus-circle-fill" />}
        />

        {selected && (
          <Typography
            variant="subtitle2"
            sx={{
              mr: 2,
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            }}
          >
            {selected.length} Items selected
          </Typography>
        )}

        {action && action}
      </Box>
    </Portal>
  );
}

FileManagerActionSelected.propTypes = {
  action: PropTypes.node,
  numSelected: PropTypes.number,
  onSelectAllItems: PropTypes.func,
  rowCount: PropTypes.number,
  selected: PropTypes.array,
  sx: PropTypes.object,
};
