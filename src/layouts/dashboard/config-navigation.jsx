import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  moderate: icon('ic_moderate'),
  reporter: icon('ic_report'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          {
            title: t('home'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
          // {
          //   title: t('ecommerce'),
          //   path: paths.dashboard.general.ecommerce,
          //   icon: ICONS.ecommerce,
          // },
          {
            title: t('analytics'),
            path: paths.dashboard.general.analytics,
            icon: ICONS.analytics,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('management'),
        items: [
          // MODERATE
          {
            title: t('moderate'),
            path: paths.dashboard.moderate.root,
            icon: ICONS.order,
          },

          // REPORT
          {
            title: t('report'),
            path: paths.dashboard.report.root,
            icon: ICONS.report,
          },

          // FILE MANAGER
          {
            title: t('file_manager'),
            path: paths.dashboard.fileManager,
            icon: ICONS.folder,
          },

          // MAIL
          {
            title: t('mail'),
            path: paths.dashboard.mail,
            icon: ICONS.mail,
            info: <Label color="error">+32</Label>,
          },

          // CHAT
          {
            title: t('chat'),
            path: paths.dashboard.chat,
            icon: ICONS.chat,
          },

          // CALENDAR
          {
            title: t('calendar'),
            path: paths.dashboard.calendar,
            icon: ICONS.calendar,
          },

          // KANBAN
          {
            title: t('kanban'),
            path: paths.dashboard.kanban,
            icon: ICONS.kanban,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
