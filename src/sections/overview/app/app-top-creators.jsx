import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export default function AppTopCreatorSellAssets({ title, subheader, list, ...other }) {
  return (
    <div className="mt-2">
      <CardHeader title="Bảng xếp hạng" />
      {list.length > 0 ? (
        <Stack spacing={3} sx={{ p: 3 }}>
          {orderBy(list, ['totalRevenue'], ['desc']).map((item, index) => (
            <AuthorItem key={item.creator.id} item={item} index={index} />
          ))}
        </Stack>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
}

AppTopCreatorSellAssets.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

export function AppTopCreatorHired({ title, subheader, list, ...other }) {
  return (
    <div className="mt-2">
      <CardHeader title="Bảng xếp hạng" />
      <Stack spacing={3} sx={{ p: 3 }}>
        {orderBy(list, ['totalRevenue'], ['desc']).map((item, index) => (
          <AuthorItem key={item.creator.id} item={item} index={index} />
        ))}
      </Stack>
    </div>
  );
}

AppTopCreatorHired.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function AuthorItem({ item, index }) {
  return (
    <>
      {item ? (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={item.creator.fullname} src={item.creator.avatar} />

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">{item.creator.fullname}</Typography>

            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.secondary',
              }}
            >
              <Iconify icon="solar:heart-bold" width={14} sx={{ mr: 0.5 }} />
              {fShortenNumber(item.totalRevenue)} Xu
            </Typography>
          </Box>

          <Iconify
            icon="solar:cup-star-bold"
            sx={{
              p: 1,
              width: 40,
              height: 40,
              borderRadius: '50%',
              color: 'primary.main',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              ...(index === 1 && {
                color: 'info.main',
                bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
              }),
              ...(index === 2 && {
                color: 'error.main',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              }),
            }}
          />
        </Stack>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

AuthorItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};
