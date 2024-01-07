import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function NavDesktop({ data }) {
  return (
    <Stack component="nav" direction="row" spacing={5} sx={{ mr: 2.5, height: 1 }}>
      {data.map((list) => (
        <NavList key={list.title} data={list} />
      ))}
    </Stack>
  );
}

NavDesktop.propTypes = {
  data: PropTypes.array,
};
