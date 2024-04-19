import React from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { fDateTime } from 'src/utils/format-time';

export default function TransactionHistory(transactionHistory) {
  const { transactions } = transactionHistory;

  const fromAccRowTemplate = (rowData) => (
    <div className="flex flex-row align-items-center">
      <img
        src={rowData.fromAccount.avatar}
        alt={rowData.fromAccount.fullname}
        style={{ width: '32px', height: '32px', borderRadius: '50%' }}
      />
      <span className="ml-1">{rowData.fromAccount.fullname}</span>
    </div>
  );

  const toAccRowTemplate = (rowData) => (
    <div className="flex flex-row align-items-center">
      <img
        src={rowData.toAccount.avatar}
        alt={rowData.toAccount.fullname}
        style={{ width: '32px', height: '32px', borderRadius: '50%' }}
      />
      <span className="ml-1">{rowData.toAccount.fullname}</span>
    </div>
  );

  const priceRowTemplate = (rowData) => <span>{rowData.price.toLocaleString()}</span>;
 
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
      value={transactions}
      className="w-full"
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      emptyMessage="Hãy tham gia vào các dịch vụ của Artworkia nhé!"
    >
      <Column field="fromAccount" header="Người gửi" body={fromAccRowTemplate} />
      <Column body={<i className="pi pi-arrow-right ml-1" />} />
      <Column field="toAccount" header="Người nhận" body={toAccRowTemplate} />
      <Column field="detail" header="Chi tiết" />
      <Column field="price" header="Giá (XU)" body={priceRowTemplate} sortable />
      <Column
        field="transactionStatus"
        header="Trạng thái"
        body={statusRowTemplate}
        style={{ display: 'flex' }}
        sortable
      />
      <Column field="createdOn" body={timeRowTemplate} header="Ngày tạo" />
    </DataTable>
  );
}
