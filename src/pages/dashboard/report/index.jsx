import { Helmet } from 'react-helmet-async';

import ReportView from 'src/sections/report/report-view';

// ----------------------------------------------------------------------

export default function ReportPage() {
  return (
    <>
      <Helmet>
        <title> Báo cáo: Báo cáo</title>
      </Helmet>

      <ReportView />
    </>
  );
}
