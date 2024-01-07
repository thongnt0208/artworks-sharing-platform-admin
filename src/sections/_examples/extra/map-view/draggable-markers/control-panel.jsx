import { memo } from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';

import { StyledControlPanel } from 'src/components/map';

// ----------------------------------------------------------------------

const EVENT_NAMES = ['onDragStart', 'onDrag', 'onDragEnd'];

function round5(value) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

// ----------------------------------------------------------------------

function ControlPanel({ events = {} }) {
  return (
    <StyledControlPanel>
      {EVENT_NAMES.map((event) => {
        const lngLat = events[event];

        return (
          <div key={event}>
            <Typography variant="subtitle2" sx={{ color: 'common.white' }}>
              {event}:
            </Typography>

            {lngLat ? (
              <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                {`${round5(lngLat.lng)}, ${round5(lngLat.lat)}`}
              </Typography>
            ) : (
              <Typography variant="body2" component="em" sx={{ color: 'error.main' }}>
                null
              </Typography>
            )}
          </div>
        );
      })}
    </StyledControlPanel>
  );
}

ControlPanel.propTypes = {
  events: PropTypes.object,
};
export default memo(ControlPanel);
