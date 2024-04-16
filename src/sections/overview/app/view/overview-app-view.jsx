/* eslint-disable */
// ----------------------------------------------------------------------

import Stack from '@mui/material/Stack';
import AppWidget from '../app-widget';
import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Card, CardHeader } from '@mui/material';

import { getAuthInfo } from 'src/utils/AuthUtil';

// import { _appAuthors, _appInvoices } from 'src/_mock';
import { _appAuthors } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import { BoughtAssetsData, BoughtAssetsTrendingData } from './MockData';
// import AppNewInvoice from '../app-new-invoice';
import AppTopCreatorSellAssets, { AppTopCreatorHired } from '../app-top-creators';
import AppWidgetSummary from '../app-widget-summary';
// import AppCurrentDownload from '../app-current-download';
import AnalyticsWidgetSummary from '../../analytics/analytics-widget-summary';
import AppBoughtAssetsTrending, { AppHiredServiceTrending } from '../app-line-chart';
import AppBoughtAssetsCategory, { AppHiredServiceCategory } from '../app-pie-chart';
import AppTransactionHistory from '../app-transaction-history';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  const currentUserInfo = getAuthInfo();

  const [lineChartData, setLineChartData] = useState({
    labels: BoughtAssetsTrendingData.map((data) => data.month),
    datasets: [
      {
        label: 'Số lượng người dùng mua tài nguyên',
        data: BoughtAssetsTrendingData.map((data) => data.amount),
      },
    ],
  });

  const [donutChartData, setDonutChartData] = useState({
    labels: BoughtAssetsData.map((data) => data.category),
    datasets: [
      {
        label: 'Tài nguyên đã mở khóa',
        data: BoughtAssetsData.map((data) => data.value),
      },
    ],
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Xin chào {currentUserInfo?.fullname}, Mừng bạn trở lại 👋
      </Typography>

      <Grid container spacing={3}>
        {/* Analyst Widgets */}
        <>
          <Grid xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Tác phẩm"
              total={234}
              icon={<img alt="icon" src="/assets/icons/glass/ic-landscape-48.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Người dùng"
              total={1352831}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/ic-user-48.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Dịch vụ"
              total={714000}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/ic-draw-48.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Báo cáo"
              total={1723315}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic-open-envelope-48.png" />}
            />
          </Grid>
        </>

        {/* New Invoice Widget
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
        </Grid> */}

        {/* Xu hướng mở khóa tài nguyên */}
        <Card className="w-full flex flex-column">
          <CardHeader title="Xu hướng mở khóa tài nguyên" sx={{ mb: 5 }} />
          <div className="w-full flex flex-row">
            <Grid xs={12} md={6} lg={9}>
              <AppBoughtAssetsTrending data={lineChartData} />
            </Grid>
            <Grid xs={12} md={6} lg={3}>
              <AppBoughtAssetsCategory chart={donutChartData} lg={12} />
              <AppTopCreatorSellAssets lg={12} list={_appAuthors} />
            </Grid>
          </div>
        </Card>

        {/* Xu hướng thuê dịch vụ */}
        <Card className="w-full flex flex-column mt-2">
          <CardHeader title="Xu hướng thuê dịch vụ" sx={{ mb: 5 }} />
          <div className="w-full flex flex-row">
            <Grid xs={12} md={6} lg={9}>
              <AppHiredServiceTrending data={lineChartData} />
            </Grid>
            <Grid xs={12} md={6} lg={3}>
              <AppHiredServiceCategory chart={donutChartData} lg={12} />
              <AppTopCreatorHired lg={12} list={_appAuthors} />
            </Grid>
          </div>
        </Card>

        {/* Lịch sủ giao dịch */}
        <Card className="w-full flex flex-column mt-2">
          <div className="w-full flex flex-row">
            <Grid xs={12} md={6} lg={9}>
              <AppTransactionHistory />
            </Grid>
            <Grid className="flex flex-column" xs={12} md={6} lg={3}>
              <Grid xs={12} md={12} lg={12}>
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
              <Grid xs={12} md={12} lg={12}>
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
            </Grid>
          </div>
        </Card>
      </Grid>
    </Container>
  );
}
