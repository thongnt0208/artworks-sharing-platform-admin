/* eslint-disable */
// ----------------------------------------------------------------------

import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { CardHeader } from '@mui/material';
import { Chart as ChartJS } from 'chart.js/auto';

// ----------------------------------------------------------------------

export default function AppBoughtAssetsCategory({ chart }) {
  return (
    <div className="m-3">
      <CardHeader title="Thể loại tài nguyên" />
      <Pie data={chart} />
    </div>
  );
}

AppBoughtAssetsCategory.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

export function AppHiredServiceCategory({ chart }) {
  return (
    <div className="m-3">
      <CardHeader title="Thể loại dịch vụ" />
      <Pie data={chart} />
    </div>
  );
}

AppHiredServiceCategory.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
