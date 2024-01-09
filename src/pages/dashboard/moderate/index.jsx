import { Helmet } from 'react-helmet-async';

import  ModerateView  from 'src/sections/moderate/view/moderate-view';

// ----------------------------------------------------------------------

export default function ModeratePage() {
  return (
    <>
      <Helmet>
        <title> Moderate: Moderate</title>
      </Helmet>

      <ModerateView />
    </>
  );
}
