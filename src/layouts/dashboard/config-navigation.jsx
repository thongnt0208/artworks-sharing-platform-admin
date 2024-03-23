import { useMemo, useContext } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { AuthContext } from 'src/auth/context/jwt/auth-provider';

import { ICONS } from './icon';

// ----------------------------------------------------------------------

export function useNavData() {
  const authContext = useContext(AuthContext);
  console.log(authContext);
  const { t } = useTranslate();

  const commonData = useMemo(() => [
    // OVERVIEW
    {
      subheader: t('overview'),
      items: [
        {
          title: t('home'),
          path: paths.dashboard.root,
          icon: ICONS.dashboard,
        }
      ],
    },
  ], [t]);

  const adminData = useMemo(() => {
    const adminSpecific = [
      // MODERATE
      {
        title: t('moderate'),
        path: paths.dashboard.moderate.root,
        icon: ICONS.order,
      },
      // ACCOUNT MANAGER
      {
        title: t('account'),
        path: paths.dashboard.user.list,
        icon: ICONS.user,
      },
      // CATEGORY MANAGER
      {
        title: 'Thể loại',
        path: paths.dashboard.category.root,
        icon: ICONS.category,
      },
      // INVOICE MANAGER
      {
        title: t('transaction'),
        path: paths.dashboard.invoice.root,
        icon: ICONS.invoice,
      },
      // REPORT
      {
        title: 'Báo cáo',
        path: paths.dashboard.report.root,
        icon: ICONS.reporter,
      },
    ];
    return [
      ...commonData,
      {
        subheader: t('management'),
        items: [...adminSpecific],
      },
    ];
  }, [commonData, t]);

  const moderatorData = useMemo(() => {
    const moderatorSpecific = [
      // MODERATE
      {
        title: t('moderate'),
        path: paths.dashboard.moderate.root,
        icon: ICONS.order,
      },
      // CATEGORY MANAGER
      {
        title: 'Thể loại',
        path: paths.dashboard.category.root,
        icon: ICONS.category,
      },
      // REPORT
      {
        title: t('report'),
        path: paths.dashboard.report.root,
        icon: ICONS.reporter,
      },
    ];
    return [
      ...commonData,
      {
        subheader: t('management'),
        items: [...moderatorSpecific],
      },
    ];
  }, [commonData, t]);

  const userRole = authContext?.authInfo?.role;

  return userRole === 'Admin' ? adminData : moderatorData;
}
