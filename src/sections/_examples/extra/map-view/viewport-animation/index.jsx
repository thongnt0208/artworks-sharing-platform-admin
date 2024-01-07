import Map from 'react-map-gl';
import PropTypes from 'prop-types';
import { memo, useRef, useState, useCallback } from 'react';

import { MapControl } from 'src/components/map';

import ControlPanel from './control-panel';

// ----------------------------------------------------------------------

function MapViewportAnimation({ data, ...other }) {
  const mapRef = useRef(null);

  const [selectedCity, setSelectedCity] = useState(data[2].city);

  const onSelectCity = useCallback((event, { longitude, latitude }) => {
    setSelectedCity(event.target.value);
    mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
  }, []);

  return (
    <Map
      initialViewState={{
        latitude: 37.7751,
        longitude: -122.4193,
        zoom: 11,
        bearing: 0,
        pitch: 0,
      }}
      ref={mapRef}
      {...other}
    >
      <MapControl />

      <ControlPanel data={data} selectedCity={selectedCity} onSelectCity={onSelectCity} />
    </Map>
  );
}

MapViewportAnimation.propTypes = {
  data: PropTypes.array,
};

export default memo(MapViewportAnimation);
