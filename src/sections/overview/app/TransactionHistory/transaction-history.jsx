import React from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { getAuthInfo } from 'src/utils/AuthUtil';

export default function TransactionHistory(transactionHistory) {
  console.log('Transaction History: ', transactionHistory);
  const fromAccRowTemplate = (rowData) => (
    <span className={rowData.accountId !== getAuthInfo()?.id ? 'text-blue-600' : 'text-red-500'}>
      {rowData.accountId !== getAuthInfo()?.id ? (
        <>
          <i className="pi pi-arrow-up mr-1" />
          {rowData.fromFullname}
        </>
      ) : (
        <>
          <i className="pi pi-arrow-down mr-1" />
          Tôi
        </>
      )}
    </span>
  );

  const priceRowTemplate = (rowData) => (
    <span className={rowData.accountId !== getAuthInfo()?.id ? 'text-blue-600' : 'text-red-500'}>
      {rowData.accountId !== getAuthInfo()?.id ? (
        <>+{rowData.price.toLocaleString()}</>
      ) : (
        <>-{rowData.price.toLocaleString()}</>
      )}
    </span>
  );

  const statusRowTemplate = (rowData) => (
    <span
      style={{
        width: 'fit-content',
        textAlign: 'center',
        backgroundColor: rowData.transactionStatus === 'Thành công' ? 'green' : 'red',
        padding: '0.25rem 0.5rem',
        borderRadius: '1rem',
        color: 'white',
      }}
    >
      {rowData.transactionStatus}
    </span>
  );

  return (
    <DataTable
      // value={transactionHistory}
      className="w-full"
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      emptyMessage="Hãy tham gia vào các dịch vụ của Artworkia nhé!"
    >
      <Column field="fromFullname" header="Người gửi/nhận" body={fromAccRowTemplate} />
      <Column field="detail" header="Chi tiết" />
      <Column field="price" header="Giá (XU)" body={priceRowTemplate} sortable />
      <Column
        field="transactionStatus"
        header="Trạng thái"
        body={statusRowTemplate}
        style={{ display: 'flex' }}
        sortable
      />
      <Column field="createdOn" header="Ngày tạo" />
    </DataTable>
  );
}
