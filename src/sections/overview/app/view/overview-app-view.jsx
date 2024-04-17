/* eslint-disable */
// ----------------------------------------------------------------------

import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import AppWidget from '../app-widget';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Card, CardHeader } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { getAuthInfo } from 'src/utils/AuthUtil';
import { useSettingsContext } from 'src/components/settings';
import AppTopCreatorSellAssets, { AppTopCreatorHired } from '../app-top-creators';
import AppWidgetSummary from '../app-widget-summary';
import AnalyticsWidgetSummary from '../../analytics/analytics-widget-summary';
import AppBoughtAssetsTrending, { AppHiredServiceTrending } from '../app-line-chart';
import AppBoughtAssetsCategory, { AppHiredServiceCategory } from '../app-pie-chart';
import AppTransactionHistory from '../app-transaction-history';
import {
  GetAssetTransactionStatistic,
  GetPercentageCategoryAssetTransactionStatistic,
  GetPercentageCategoryProposalStatistic,
  GetProposalStatistic,
  GetTopCreatorMostHiredProposal,
  GetTopCreatorMostSellAsset,
  GetTotalAccounts,
  GetTotalArtworks,
  GetTotalReports,
  GetTotalServices,
} from './Service';
import { GenerateArrayOfRandomColorCode } from 'src/utils/ColorHandler';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const currentUserInfo = getAuthInfo();
  if (!currentUserInfo) {
    window.location.href = '/login';
  }

  const theme = useTheme();

  const settings = useSettingsContext();

  const [totalArtworks, setTotalArtworks] = useState(0);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalService, setTotalService] = useState(0);
  const [totalReport, setTotalReport] = useState(0);
  const [topCreatorMostSellAsset, setTopCreatorMostSellAsset] = useState([]);
  const [topCreatorMostHired, setTopCreatorMostHired] = useState([]);
  const [percentageCategoryProposal, setPercentageCategoryProposal] = useState({
    labels: [],
    datasets: [
      {
        label: 'Tỉ lệ: ',
        backgroundColor: GenerateArrayOfRandomColorCode(14),
        data: [],
      },
    ],
  });
  const [percentageCategoryAssetTransaction, setPercentageCategoryAssetTransaction] = useState({
    labels: [],
    datasets: [
      {
        label: 'Tỉ lệ: ',
        backgroundColor: GenerateArrayOfRandomColorCode(14),
        data: [],
      },
    ],
  });
  const [proposalStatistic, setProposalStatistic] = useState({
    labels: [],
    datasets: [
      {
        label: 'Số lượng trong ngày: ',
        backgroundColor: GenerateArrayOfRandomColorCode(14),
        data: [],
      },
    ],
  });
  const [assetTransactionStatistic, setAssetTransactionStatistic] = useState({
    labels: [],
    datasets: [
      {
        label: 'Số lượng trong ngày: ',
        backgroundColor: GenerateArrayOfRandomColorCode(1),
        data: [],
      },
      {
        label: 'Số lượng tổng: ',
        backgroundColor: GenerateArrayOfRandomColorCode(1),
        data: [],
      }
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Thống kê
        GetTotalArtworks().then((data) => {
          setTotalArtworks(data);
        });
        GetTotalAccounts().then((data) => {
          setTotalAccounts(data);
        });
        GetTotalServices().then((data) => {
          setTotalService(data);
        });
        GetTotalReports().then((data) => {
          setTotalReport(data);
        });

        // Line Chart 
        GetProposalStatistic().then((data) => {
          setProposalStatistic(data);
        });
        GetAssetTransactionStatistic().then((data) => {
          setAssetTransactionStatistic(data);
        });
        // Pie Chart 
        GetPercentageCategoryAssetTransactionStatistic().then((data) => {
          setPercentageCategoryAssetTransaction(data);
        });
        GetPercentageCategoryProposalStatistic().then((data) => {
          setPercentageCategoryProposal(data);
        });

        // Top Creator 
        GetTopCreatorMostSellAsset().then((data) => {
          setTopCreatorMostSellAsset(data);
        });
        GetTopCreatorMostHiredProposal().then((data) => {
          setTopCreatorMostHired(data);
        });
      } catch {
        console.error('Không thể lấy dữ liệu thống kê đề xuất.');
      }
    };
    fetchData();
  }, []);

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
        {/* Thống kê */}
        <>
          <Grid xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Tác phẩm"
              total={totalArtworks}
              icon={<img alt="icon" src="/assets/icons/glass/ic-landscape-48.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Người dùng"
              total={totalAccounts}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/ic-user-48.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Dịch vụ"
              total={totalService}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/ic-draw-48.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Báo cáo"
              total={totalReport}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic-open-envelope-48.png" />}
            />
          </Grid>
        </>

        {/* Xu hướng mở khóa tài nguyên */}
        <Card className="w-full flex flex-column">
          <CardHeader title="Xu hướng mở khóa tài nguyên" sx={{ mb: 5 }} />
          {assetTransactionStatistic &&
          assetTransactionStatistic.labels.length > 0 &&
          percentageCategoryAssetTransaction &&
          percentageCategoryAssetTransaction.labels.length > 0 &&
          topCreatorMostSellAsset &&
          topCreatorMostSellAsset.length > 0 ? (
            <div className="w-full flex flex-row">
              <Grid xs={12} md={6} lg={9}>
                <AppBoughtAssetsTrending data={assetTransactionStatistic} />
              </Grid>
              <Grid xs={12} md={6} lg={3}>
                <AppBoughtAssetsCategory chart={percentageCategoryAssetTransaction} lg={12} />
                <AppTopCreatorSellAssets lg={12} list={topCreatorMostSellAsset} />
              </Grid>
            </div>
          ) : (
            <LoadingScreen />
          )}
        </Card>

        {/* Xu hướng thuê dịch vụ */}
        <Card className="w-full flex flex-column mt-2">
          <CardHeader title="Xu hướng thuê dịch vụ" sx={{ mb: 5 }} />
          {proposalStatistic &&
          proposalStatistic.labels.length > 0 &&
          percentageCategoryProposal &&
          percentageCategoryProposal.labels.length > 0 &&
          topCreatorMostHired &&
          topCreatorMostHired.length > 0 ? (
            <div className="w-full flex flex-row">
              <Grid xs={12} md={6} lg={9}>
                <AppHiredServiceTrending data={proposalStatistic} />
              </Grid>
              <Grid xs={12} md={6} lg={3}>
                <AppHiredServiceCategory chart={percentageCategoryProposal} lg={12} />
                <AppTopCreatorHired lg={12} list={topCreatorMostHired} />
              </Grid>
            </div>
          ) : (
            <LoadingScreen />
          )}
        </Card>

        {/* Lịch sủ giao dịch */}
        <Card className="w-full flex justify-content-center mt-2">
          <div className="w-full flex flex-row justify-content-center">
            <Grid xs={12} md={6} lg={12}>
              <AppTransactionHistory />
            </Grid>
            {/* <Grid className="flex flex-column" xs={12} md={6} lg={3}>
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
            </Grid> */}
          </div>
        </Card>
      </Grid>
    </Container>
  );
}
