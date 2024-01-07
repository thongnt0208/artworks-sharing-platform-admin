import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function SimpleNode({ node, sx }) {
  return (
    <Card
      sx={{
        p: 2,
        boxShadow: 'none',
        borderRadius: 1.5,
        display: 'inline-flex',
        textTransform: 'capitalize',
        color: (theme) => (theme.palette.mode === 'light' ? 'primary.darker' : 'primary.lighter'),
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
        ...sx,
      }}
    >
      <Typography variant="subtitle2">{node.name}</Typography>
    </Card>
  );
}

SimpleNode.propTypes = {
  node: PropTypes.object,
  sx: PropTypes.object,
};
