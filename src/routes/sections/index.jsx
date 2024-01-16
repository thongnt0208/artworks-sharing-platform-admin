import { useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// -------------------------------

import { getAuthInfo } from 'src/utils/AuthUtil';
// -------------------------------

import LoginScreen from 'src/pages/auth/LoginScreen/LoginScreen';

// -------------------------------

// import { PATH_AFTER_LOGIN } from 'src/config-global';
import { mainRoutes } from './main';
import { dashboardRoutes } from './dashboard';
import { componentsRoutes } from './components';

// ----------------------------------------------------------------------

export default function Router() {
  
  const [authInfo, setAuthInfo] = useState(getAuthInfo());
  console.log(authInfo);
  const [isLogin, setIsLogin] = useState(!!authInfo?.id);
  
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    {
      path: '/',
      element: <Navigate to={dashboardRoutes[0].path} replace />,
    },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    // {
    //   path: '/',
    //   element: (
    //     <MainLayout>
    //       <HomePage />
    //     </MainLayout>
    //   ),
    // },

    // Auth routes
    // ...authRoutes,
    // ...authDemoRoutes,
    {
      path: "/login",
      element: (
        <LoginScreen
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setAuthInfoChanged={setAuthInfo}
        />
      ),
    },


    // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    // Components routes
    ...componentsRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
