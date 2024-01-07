import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { fData } from 'src/utils/format-number';

import { fileData } from '../file-thumbnail';

// ----------------------------------------------------------------------

export default function RejectionFiles({ fileRejections }) {
  if (!fileRejections.length) {
    return null;
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        textAlign: 'left',
        borderStyle: 'dashed',
        borderColor: 'error.main',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = fileData(file);

        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {size ? fData(size) : ''}
            </Typography>

            {errors.map((error) => (
              <Box key={error.code} component="span" sx={{ typography: 'caption' }}>
                - {error.message}
              </Box>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
}

RejectionFiles.propTypes = {
  fileRejections: PropTypes.array,
};
