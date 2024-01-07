import Map from 'react-map-gl';
import PropTypes from 'prop-types';
import { memo, useState, useCallback } from 'react';

import { MapControl } from 'src/components/map';

import ControlPanel from './control-panel';

// ----------------------------------------------------------------------

function MapChangeTheme({ themes, ...other }) {
  const [selectTheme, setSelectTheme] = useState('outdoors');

  const handleChangeTheme = useCallback((value) => setSelectTheme(value), []);

  return (
    <>
      <Map
        initialViewState={{
          latitude: 37.785164,
          longitude: -100,
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle={themes?.[selectTheme]}
        {...other}
      >
        <MapControl />
      </Map>

      <ControlPanel themes={themes} selectTheme={selectTheme} onChangeTheme={handleChangeTheme} />
    </>
  );
}

MapChangeTheme.propTypes = {
  themes: PropTypes.object,
};

export default memo(MapChangeTheme);
