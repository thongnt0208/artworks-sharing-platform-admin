import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';

import PaymentCardItem from './payment-card-item';

// ----------------------------------------------------------------------

export default function PaymentCardListDialog({ open, list, onClose, selected, onSelect }) {
  const [searchCard, setSearchCard] = useState('');

  const dataFiltered = applyFilter({
    inputData: list,
    query: searchCard,
  });

  const notFound = !dataFiltered.length && !!searchCard;

  const handleSearchAddress = useCallback((event) => {
    setSearchCard(event.target.value);
  }, []);

  const handleSelectCard = useCallback(
    (card) => {
      onSelect(card);
      setSearchCard('');
      onClose();
    },
    [onClose, onSelect]
  );

  const renderList = (
    <Stack spacing={2.5} sx={{ p: 3 }}>
      {list.map((card) => (
        <PaymentCardItem
          key={card.id}
          card={card}
          onClick={() => handleSelectCard(card)}
          sx={{
            cursor: 'pointer',
            ...(selected(card.id) && {
              boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
            }),
          }}
        />
      ))}
    </Stack>
  );

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 3, pr: 1.5 }}
      >
        <Typography variant="h6"> Cards </Typography>

        <Button
          size="small"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ alignSelf: 'flex-end' }}
        >
          New
        </Button>
      </Stack>

      <Stack sx={{ px: 3 }}>
        <TextField
          value={searchCard}
          onChange={handleSearchAddress}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {notFound ? <SearchNotFound query={searchCard} sx={{ px: 3, pt: 5, pb: 10 }} /> : renderList}
    </Dialog>
  );
}

PaymentCardListDialog.propTypes = {
  list: PropTypes.array,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  open: PropTypes.bool,
  selected: PropTypes.func,
};

// ----------------------------------------------------------------------

function applyFilter({ inputData, query }) {
  if (query) {
    return inputData.filter(
      (card) => card.cardNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}
