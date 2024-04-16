/* eslint-disable */
// ----------------------------------------------------------------------

import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

// ----------------------------------------------------------------------

export default function AppBoughtAssetsTrending({ data }) {
  return (
    <div className="m-3">
      <Line data={data} />
    </div>
  );
}

AppBoughtAssetsTrending.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

export function AppHiredServiceTrending({ data }) {
  return (
    <div className="m-3">
      <Line data={data} />
    </div>
  );
}

AppBoughtAssetsTrending.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
