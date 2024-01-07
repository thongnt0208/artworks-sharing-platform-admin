import { memo } from 'react';
import PropTypes from 'prop-types';

import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { StyledControlPanel } from 'src/components/map';

// ----------------------------------------------------------------------

function ControlPanel({ themes, selectTheme, onChangeTheme }) {
  return (
    <StyledControlPanel>
      <Typography gutterBottom variant="subtitle2" sx={{ color: 'common.white' }}>
        Select Theme:
      </Typography>

      <RadioGroup value={selectTheme} onChange={(event, newValue) => onChangeTheme(newValue)}>
        {Object.keys(themes).map((item) => (
          <FormControlLabel
            key={item}
            value={item}
            control={<Radio size="small" />}
            label={item}
            sx={{ color: 'common.white', textTransform: 'capitalize' }}
          />
        ))}
      </RadioGroup>
    </StyledControlPanel>
  );
}

ControlPanel.propTypes = {
  onChangeTheme: PropTypes.func,
  selectTheme: PropTypes.string,
  themes: PropTypes.object,
};

export default memo(ControlPanel);
