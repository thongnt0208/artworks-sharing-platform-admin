import React from 'react';
import PropTypes from 'prop-types';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { fDateTime } from 'src/utils/format-time';

export default function WalletHistory(walletHistoryList) {
  const { walletHistory } = walletHistoryList;

  const accountRowTemplate = (rowData) => (
    <div className="flex flex-row align-items-center">
      <img
        src={rowData.account.avatar}
        alt={rowData.account.fullname}
        className="mr-2"
        style={{ width: '32px', height: '32px', borderRadius: '50%' }}
      />
      <span>{rowData.account.fullname}</span>
    </div>
  );

  const typeRowTemplate = (rowData) => (
    <span className={rowData.type === 'Deposit' ? 'text-blue-600' : 'text-red-500'}>
      {rowData.type === 'Deposit' ? (
        <>
          <i className="pi pi-arrow-down mr-1" />
          Nạp tiền
        </>
      ) : (
        <>
          <i className="pi pi-arrow-up mr-1" />
          Rút tiền
        </>
      )}
    </span>
  );

  const amountRowTemplate = (rowData) => (
    <span className={rowData.type === 'Deposit' ? 'text-blue-600' : 'text-red-500'}>
      {rowData.type === 'Deposit'
        ? `+${rowData.amount.toLocaleString()}`
        : `-${rowData.amount.toLocaleString()}`}
    </span>
  );

  const statusRowTemplate = (rowData) => {
    let backgroundColor;
    let status;
    switch (rowData.transactionStatus) {
      case 'Success':
        backgroundColor = 'green';
        status = 'Thành công';
        break;
      case 'InProgress':
        backgroundColor = '#059bff';
        status = 'Đang xử lý';
        break;
      default:
        backgroundColor = 'red';
        status = 'Thất bại';
    }

    return (
      <span
        style={{
          width: 'fit-content',
          height: '100%',
          backgroundColor,
          padding: '0.25rem 0.5rem',
          borderRadius: '1rem',
          color: 'white',
          textAlign: 'center',
        }}
      >
        {status}
      </span>
    );
  };

  const timeRowTemplate = (rowData) => <span>{fDateTime(rowData.createdOn)}</span>;

  return (
    <DataTable
      value={walletHistory}
      className="w-full"
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      emptyMessage="Hãy nạp thêm Xu để trải nghiệm các dịch vụ của Artworkia nhé!"
    >
      <Column field="account" header="Tài khoản" body={accountRowTemplate} sortable />
      <Column field="type" header="Loại" body={typeRowTemplate} sortable />
      <Column field="paymentMethod" header="Phương thức" sortable />
      <Column field="amount" header="Số lượng (Xu)" body={amountRowTemplate} sortable />
      <Column
        field="transactionStatus"
        header="Trạng thái"
        body={statusRowTemplate}
        sortable
      />
      <Column field="createdOn" header="Ngày tạo" body={timeRowTemplate} sortable />
    </DataTable>
  );
}

WalletHistory.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  walletHistory: PropTypes.array,
};
