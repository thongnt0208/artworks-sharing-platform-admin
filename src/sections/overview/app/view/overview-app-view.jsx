import { Button as ButtonPR } from 'primereact/button';

import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { _appAuthors, _appInvoices } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import AppWidget from '../app-widget';
import AppNewInvoice from '../app-new-invoice';
import AppTopAuthors from '../app-top-authors';
import AppWidgetSummary from '../app-widget-summary';
import AppCurrentDownload from '../app-current-download';
import AnalyticsWidgetSummary from '../../analytics/analytics-widget-summary';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <>
      <ButtonPR className='max-w-max' label="Đây là Button từ thư viện PrimeReact" />
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography
          variant="h4"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          Xin chào {user?.displayName}, Mừng bạn trở lại 👋
        </Typography>

        <Grid container spacing={3}>
          {/* Analyst Widgets */}
          <>
            <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Doanh thu hàng tuần"
                total={714000}
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Người dùng"
                total={1352831}
                color="info"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Đơn thuê"
                total={1723315}
                color="warning"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Báo cáo"
                total={234}
                color="error"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
              />
            </Grid>
          </>

          {/* New Invoice Widget */}
          <Grid xs={12} lg={8}>
            <AppNewInvoice
              title="Giao dịch mới nhất"
              tableData={_appInvoices}
              tableLabels={[
                { id: 'id', label: 'ID giao dịch' },
                { id: 'category', label: 'Thể loại' },
                { id: 'price', label: 'Giá' },
                { id: 'status', label: 'Trạng thái' },
                { id: '' },
              ]}
            />
          </Grid>

          {/* Artworks by Categories Widget */}
          <Grid xs={12} md={6} lg={4}>
            <AppCurrentDownload
              title="Số tác phẩm theo từng thể loại"
              chart={{
                series: [
                  { label: 'Minh hoạ', value: 12244 },
                  { label: 'bìa sách', value: 53345 },
                  { label: 'Tranh vẽ', value: 44313 },
                  { label: 'Khác', value: 78343 },
                ],
              }}
            />
          </Grid>

          {/* To Authors Widget */}
          <Grid xs={12} md={6} lg={4}>
            <AppTopAuthors title="Các nhà sáng tạo hàng đầu" list={_appAuthors} />
          </Grid>

          <>
            <Grid xs={12} md={6} lg={4}>
              <Stack spacing={3}>
                <AppWidgetSummary
                  title="Tổng tác phẩm"
                  percent={2.6}
                  total={18765}
                  chart={{
                    series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                  }}
                />
                <AppWidgetSummary
                  title="Tổng Xu đã giao dịch"
                  percent={0.2}
                  total={4876}
                  chart={{
                    colors: [theme.palette.info.light, theme.palette.info.main],
                    series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
                  }}
                />
              </Stack>
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <Stack spacing={3}>
                <AppWidget
                  title="Tỷ lệ giao dịch thành công"
                  total={38566}
                  icon="solar:user-rounded-bold"
                  chart={{
                    series: 48,
                  }}
                />

                <AppWidget
                  title="Tỷ lệ ..."
                  total={55566}
                  icon="fluent:mail-24-filled"
                  color="info"
                  chart={{
                    series: 75,
                  }}
                />
              </Stack>
            </Grid>
          </>

        </Grid>
      </Container>
    </>
  );
}
