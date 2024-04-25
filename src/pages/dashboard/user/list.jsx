import { Helmet } from 'react-helmet-async';

import { UserListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserListPage() {
  return (
    <>
      <Helmet>
        <title> Tổng quan: Danh sách tài khoản</title>
      </Helmet>

      <UserListView />
    </>
  );
}
